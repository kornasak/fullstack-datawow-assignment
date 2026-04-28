export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest">
          Full-stack Developer Assignment
        </p>

        <h1 className="mb-6 text-4xl font-bold md:text-6xl">
          Free Concert Tickets Reservation
        </h1>

        <p className="mb-8 max-w-2xl text-base text-gray-600 md:text-lg">
          A full-stack web application built with Next.js and NestJS for
          managing concerts and ticket reservations with role-based access.
        </p>

        <div className="flex gap-4">
          <button className="rounded-xl px-6 py-3 font-semibold shadow">
            Get Started
          </button>
          <button className="rounded-xl border px-6 py-3 font-semibold">
            View Features
          </button>
        </div>
      </section>
    </main>
  );
}
