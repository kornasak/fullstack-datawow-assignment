import Link from 'next/link';

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-2">
      {/* Left Side */}
      <section className="hidden flex-col justify-between bg-[#057ba7] px-10 py-14 text-white md:px-18 md:py-20.5 lg:flex">
        <Link href="/" className="flex items-center gap-3">
          <span className="h-8.5 w-8.5 rounded-full bg-white" />
          <span className="text-[30px] font-bold uppercase">Brand</span>
        </Link>

        <div className="max-w-105">
          <h1 className="text-[30px] font-bold leading-tight">
            “Powering the tools that power the team.”
          </h1>

          <p className="mt-8 text-sm leading-6 text-white/90">
            Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida
            porttitor nibh urna sit ornare a. Proin dolor morbi id ornare
            aenean non?
          </p>
        </div>
      </section>

      {/* Right Side */}
      <section className="flex min-h-screen items-center justify-center px-5 py-10 lg:min-h-0 lg:px-6 lg:py-12">
        <div className="w-full max-w-105">{children}</div>
      </section>
    </main>
  );
}
