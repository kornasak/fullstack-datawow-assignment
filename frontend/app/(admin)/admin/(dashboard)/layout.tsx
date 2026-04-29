"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LuLogOut, LuMenu, LuX } from "react-icons/lu";

import { adminSidebarRoutes } from "@/config/aside-routes";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f6f6f6] lg:grid lg:grid-cols-[240px_1fr]">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 flex h-13 items-center justify-between border-b border-[#e5e5e5] bg-white pl-4 lg:hidden">
        <h1 className="text-[18px] font-bold text-black">Admin</h1>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="grid h-13 w-13 place-items-center border-l border-[#e5e5e5] text-black"
        >
          <LuMenu className="text-[24px]" />
        </button>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden min-h-screen grid-rows-[auto_1fr_auto] border-r border-[#e5e5e5] bg-white lg:grid">
        <div className="px-5 pb-6 pt-14">
          <h1 className="text-[32px] font-bold leading-none text-black">
            Admin
          </h1>
        </div>

        <nav className="space-y-1">
          {adminSidebarRoutes.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              item.activePatterns?.some((pattern) =>
                pathname.startsWith(pattern),
              );

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`grid h-16 grid-cols-[24px_1fr] items-center gap-3 px-5 text-[20px] text-black transition ${
                  active ? "bg-[#eaf5f9]" : "hover:bg-gray-100"
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

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu overlay"
          />

          <aside className="relative ml-auto grid h-full w-65 animate-[slideInRight_0.2s_ease-out] grid-rows-[auto_1fr_auto] bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-[#e5e5e5] pl-5">
              <h1 className="text-[26px] font-bold text-black">Admin</h1>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-16 w-14 place-items-center text-black"
              >
                <LuX className="text-[24px]" />
              </button>
            </div>

            <nav className="space-y-1 pt-3">
              {adminSidebarRoutes.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.href ||
                  item.activePatterns?.some((pattern) =>
                    pathname.startsWith(pattern),
                  );

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`grid h-14 grid-cols-[24px_1fr] items-center gap-3 px-5 text-[18px] text-black transition ${
                      active ? "bg-[#eaf5f9]" : "hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="text-[20px]" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pb-8">
              <Link
                href="/"
                className="grid h-12 grid-cols-[24px_1fr] items-center gap-3 px-5 text-[18px] text-black transition hover:bg-gray-100"
              >
                <LuLogOut className="text-[20px]" />
                <span>Logout</span>
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* Content */}
      <section className="px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        {children}
      </section>
    </main>
  );
}
