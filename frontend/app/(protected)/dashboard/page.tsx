import Header from "@/components/Header/Header";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth");
  }
  return (
    <div className="p-6 space-y-6">
      <Header />

      {/* <TodayWorkoutCard />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyCalendar />
        <ActiveSplit />
      </div>

      <RecentWorkouts /> */}
    </div>
  );
}

function TodayWorkoutCard() {
  return (
    <div className="rounded-xl border p-5 bg-white">
      <h2 className="text-lg font-medium mb-2">Today’s Workout</h2>

      {/* Change this block later based on state */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">Push Day</p>
          <p className="text-sm text-gray-500">
            Bench • Shoulder Press • Triceps
          </p>
        </div>

        <button className="btn-primary">Start</button>
      </div>
    </div>
  );
}
function WeeklyCalendar() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="rounded-xl border p-5 bg-white">
      <h2 className="text-lg font-medium mb-4">This Week</h2>

      <div className="grid grid-cols-7 gap-3">
        {days.map((day, i) => (
          <div
            key={i}
            className="h-16 rounded-lg border flex flex-col items-center justify-center"
          >
            <span className="text-sm">{day}</span>
            <span className="w-2 h-2 rounded-full bg-green-500 mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
function ActiveSplit() {
  return (
    <div className="rounded-xl border p-5 bg-white">
      <h2 className="text-lg font-medium mb-4">Active Split</h2>

      <p className="font-semibold mb-3">Push Pull Legs</p>

      <ul className="space-y-2">
        <li className="flex justify-between">
          <span>Push</span>
          <span className="text-sm text-gray-500">6 exercises</span>
        </li>
        <li className="flex justify-between">
          <span>Pull</span>
          <span className="text-sm text-gray-500">5 exercises</span>
        </li>
        <li className="flex justify-between">
          <span>Legs</span>
          <span className="text-sm text-gray-500">5 exercises</span>
        </li>
      </ul>
    </div>
  );
}
function RecentWorkouts() {
  return (
    <div className="rounded-xl border p-5 bg-white">
      <h2 className="text-lg font-medium mb-4">Recent Workouts</h2>

      <div className="space-y-3">
        <WorkoutRow day="Push" date="Feb 12" />
        <WorkoutRow day="Pull" date="Feb 10" />
        <WorkoutRow day="Legs" date="Feb 8" />
      </div>
    </div>
  );
}

function WorkoutRow({ day, date }: { day: string; date: string }) {
  return (
    <div className="flex items-center justify-between border-b pb-2">
      <div>
        <p className="font-medium">{day} Day</p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>

      <button className="btn-secondary">View</button>
    </div>
  );
}
