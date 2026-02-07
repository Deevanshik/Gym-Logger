import Day from "../models/day.model.js";
import Split from "../models/split.model.js";

export const getDaysBySplit = async (req, res, next) => {
  try {
    const { splitId } = req.params;

    const split = await Split.findOne({
      _id: splitId,
      userId: req.user.id,
    });

    if (!split) {
      return res.status(404).json({ message: "Split not found" });
    }

    const days = await Day.find({ splitId }).sort({ order: 1 });

    res.status(200).json(days);
  } catch (error) {
    next(error);
  }
};

export const createDay = async (req, res, next) => {
  try {
    const { splitId } = req.params;
    const { name, order } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Day name is required" });
    }

    const split = await Split.findOne({
      _id: splitId,
      userId: req.user.id,
    });

    if (!split) {
      return res.status(404).json({ message: "Split not found" });
    }

    let finalOrder = order;

    if (finalOrder === undefined) {
      const lastDay = await Day.findOne({ splitId })
        .sort({ order: -1 })
        .select("order");

      finalOrder = lastDay ? lastDay.order + 1 : 1;
    }

    const day = await Day.create({
      splitId,
      name,
      order: finalOrder,
    });

    res.status(201).json(day);
  } catch (error) {
    next(error);
  }
};

export const getDayById = async (req, res, next) => {
  try {
    const day = await Day.findById(req.params.id);

    if (!day) {
      return res.status(404).json({ message: "Day not found" });
    }

    const split = await Split.findOne({
      _id: day.splitId,
      userId: req.user.id,
    });

    if (!split) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json(day);
  } catch (error) {
    next(error);
  }
};

export const updateDay = async (req, res, next) => {
  try {
    const allowedUpdates = ["name", "order"];
    const updates = {};

    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const day = await Day.findById(req.params.id);
    if (!day) {
      return res.status(404).json({ message: "Day not found" });
    }

    const split = await Split.findOne({
      _id: day.splitId,
      userId: req.user.id,
    });

    if (!split) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedDay = await Day.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true },
    );

    res.status(200).json(updatedDay);
  } catch (error) {
    next(error);
  }
};

export const deleteDay = async (req, res, next) => {
  try {
    const day = await Day.findById(req.params.id);
    if (!day) {
      return res.status(404).json({ message: "Day not found" });
    }

    const split = await Split.findOne({
      _id: day.splitId,
      userId: req.user.id,
    });

    if (!split) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Day.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Day deleted successfully" });
  } catch (error) {
    next(error);
  }
};
