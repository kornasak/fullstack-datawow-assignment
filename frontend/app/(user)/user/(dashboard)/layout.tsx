"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuLogOut } from "react-icons/lu";

import { userSidebarRoutes } from "@/config/aside-routes";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-[#f6f6f6] lg:grid lg:grid-cols-[240px_1fr] lg:items-start">
      {/* Desktop Sidebar */}
      <aside className="sticky top-0 hidden h-screen grid-rows-[auto_1fr_auto] border-r border-[#e5e5e5] bg-white lg:grid">
        <div className="px-5 pb-6 pt-14">
          <h1 className="text-[32px] font-bold leading-none text-black">
            User
          </h1>
        </div>

        <nav className="space-y-1">
          {userSidebarRoutes.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`grid h-16 grid-cols-[24px_1fr] items-center gap-3 px-5 text-[20px] text-black transition ${
                  active ? "bg-[#e6f3f8]" : "hover:bg-gray-100"
                }`}
              >
                <Icon className="text-[20px]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="pb-14">
          <Link
            href="/"
            className="grid h-12 grid-cols-[24px_1fr] items-center gap-3 px-5 text-[20px] text-black transition hover:bg-gray-100"
          >
            <LuLogOut className="text-[20px]" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Content */}
      <section className="px-4 py-5 pb-24 sm:px-6 lg:px-8 lg:py-8 lg:pb-8">
        {children}
      </section>

      {/* Mobile Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 grid h-20 grid-cols-3 border-t border-[#e5e5e5] bg-white lg:hidden">
        {userSidebarRoutes.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 text-[13px] transition ${
                active ? "text-[#1e88e5]" : "text-gray-400"
              }`}
            >
              <Icon className="text-[26px]" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-1 text-[13px] text-gray-400 transition hover:text-[#ff3b3b]"
        >
          <LuLogOut className="text-[26px]" />
          <span>Logout</span>
        </Link>
      </nav>
    </main>
  );
}
