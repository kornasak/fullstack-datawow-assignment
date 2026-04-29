"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiAward, FiUser, FiXCircle } from "react-icons/fi";

export default function AdminConcertsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isOverview = pathname === "/admin/concerts/overview";
  const isCreate = pathname === "/admin/concerts/create";

  return (
    <>
      <div className="-mx-4 overflow-x-auto px-4 pb-2 no-scrollbar md:mx-0 md:overflow-visible md:px-0 md:pb-0">
        <div className="flex min-w-max gap-3 md:grid md:min-w-0 md:grid-cols-3 md:gap-5">
          <div className="relative w-37.5 min-h-23 overflow-hidden rounded-lg bg-[#087cac] p-3 text-white shadow-md md:min-h-0 md:px-6 md:py-4 md:w-auto md:text-center">
            <FiUser className="absolute bottom-2 left-2 text-[22px] opacity-90 md:static md:mx-auto md:mb-2 md:text-[25px]" />
            <p className="text-right text-[28px] font-bold leading-none md:mt-4 md:text-center md:text-[38px] md:font-light">
              500
            </p>
            <p className="mt-1 text-right text-[11px] md:text-center md:text-[15px]">
              Total of seats
            </p>
          </div>

          <div className="relative w-37.5 min-h-23 overflow-hidden rounded-lg bg-[#08a88f] p-3 text-white shadow-md md:min-h-0 md:px-6 md:py-4 md:w-auto md:text-center">
            <FiAward className="absolute bottom-2 left-2 text-[22px] opacity-90 md:static md:mx-auto md:mb-2 md:text-[25px]" />
            <p className="text-right text-[28px] font-bold leading-none md:mt-4 md:text-center md:text-[38px] md:font-light">
              120
            </p>
            <p className="mt-1 text-right text-[11px] md:text-center md:text-[15px]">
              Reserve
            </p>
          </div>

          <div className="relative w-37.5 min-h-23 overflow-hidden rounded-lg bg-[#eb4b4f] p-3 text-white shadow-md md:min-h-0 md:px-6 md:py-4 md:w-auto md:text-center">
            <FiXCircle className="absolute bottom-2 left-2 text-[22px] opacity-90 md:static md:mx-auto md:mb-2 md:text-[25px]" />
            <p className="text-right text-[28px] font-bold leading-none md:mt-4 md:text-center md:text-[38px] md:font-light">
              12
            </p>
            <p className="mt-1 text-right text-[11px] md:text-center md:text-[15px]">
              Cancel
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-8 border-b border-[#d6d6d6]">
        <Link
          href="/admin/concerts/overview"
          className={`pb-2 ${
            isOverview
              ? "border-b-2 border-[#2196e8] font-semibold text-[#2196e8]"
              : "text-gray-600"
          }`}
        >
          Overview
        </Link>

        <Link
          href="/admin/concerts/create"
          className={`pb-2 ${
            isCreate
              ? "border-b-2 border-[#2196e8] font-semibold text-[#2196e8]"
              : "text-gray-600"
          }`}
        >
          Create
        </Link>
      </div>

      <div className="mt-4">{children}</div>
    </>
  );
}
