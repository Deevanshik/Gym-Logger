import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-blue-50">
      {/* Hero */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Track Your Training.
            <span className="block text-emerald-600">
              Build Consistency. Get Stronger.
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A simple, powerful gym logger to track workouts, splits, and
            progress - built for lifters who care about long term consistency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth"
              className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition"
            >
              Start Logging Workouts
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature
              title="Workout & Split Tracking"
              description="Create workout splits, add exercises, log sets, reps, and weights with a clean and focused interface."
            />

            <Feature
              title="Progress Over Time"
              description="Track your strength progression and stay accountable by seeing what you lifted last time."
            />

            <Feature
              title="Secure Personal Data"
              description="Your workouts are private and protected with secure authentication and session-based access."
            />
          </div>
        </div>

        {/* How it works */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Log your training in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Step step={1} text="Create your workout split" />
            <Step step={2} text="Log your workout" />
            <Step step={3} text="Review progress and stay consistent" />
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/auth"
              className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition"
            >
              Create Free Account
            </Link>
          </div>
        </div>

        {/* Philosophy */}
        <div className="mt-20 text-center">
          <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-200">
            <h3 className="text-2xl font-bold text-emerald-900 mb-4">
              Built for Serious Consistency
            </h3>
            <p className="text-emerald-800 text-lg max-w-3xl mx-auto">
              This app focuses on what actually matters in training -
              progressive overload, structure, and long term habits. No noise.
              Just logging and progress.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold mb-4">Gym Logger</h3>
          <p className="text-gray-400 mb-6">
            Simple training logs for consistent lifters
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/" className="text-gray-400 hover:text-white">
              Home
            </Link>
            <Link href="/dashboard" className="text-gray-400 hover:text-white">
              Dashboard
            </Link>
            <Link href="/login" className="text-gray-400 hover:text-white">
              Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Step({ step, text }: { step: number; text: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">
        {step}
      </div>
      <p className="text-gray-700">{text}</p>
    </div>
  );
}
