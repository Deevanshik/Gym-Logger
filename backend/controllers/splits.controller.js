import Split from "../models/split.model.js";
import Day from "../models/day.model.js";

export const createSplit = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Split name is required" });
    }

    const existingSplit = Split.findOne({ name });
    if (existingSplit) {
      return res.status(409).json({
        message: "Split already exists",
      });
    }

    const split = await Split.create({
      userId: req.user.id,
      name,
    });

    res.status(201).json(split);
  } catch (error) {
    next(error);
  }
};

export const getSplits = async (req, res, next) => {
  try {
    const splits = await Split.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json(splits);
  } catch (error) {
    next(error);
  }
};

export const getSplitById = async (req, res, next) => {
  try {
    const split = await Split.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!split) {
      return res.status(404).json({ message: "Split not found" });
    }

    const days = await Day.find({ splitId: split._id }).sort({ order: 1 });

    res.status(200).json({
      ...split.toObject(),
      days,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSplit = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Split name is required" });
    }

    const split = await Split.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: { name } },
      { new: true, runValidators: true },
    );

    if (!split) {
      return res.status(404).json({ message: "Split not found" });
    }

    res.status(200).json(split);
  } catch (error) {
    next(error);
  }
};

export const deleteSplit = async (req, res, next) => {
  try {
    const split = await Split.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!split) {
      return res.status(404).json({ message: "Split not found" });
    }

    // Cascade delete days
    await Day.deleteMany({ splitId: split._id });

    res.status(200).json({ message: "Split deleted successfully" });
  } catch (error) {
    next(error);
  }
};
