"use client";

import { getConcertAdminSummary } from "@/api/concert.api";
import { getErrorMessage } from "@/helper/axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiAward, FiUser, FiXCircle } from "react-icons/fi";
import { toast } from "react-toastify";

type Summary = {
  totalSeats: number;
  reserved: number;
  cancelled: number;
};

export default function AdminConcertsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [summary, setSummary] = useState<Summary>({
    totalSeats: 0,
    reserved: 0,
    cancelled: 0,
  });

  const isOverview = pathname === "/admin/concerts/overview";
  const isCreate = pathname === "/admin/concerts/create";

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getConcertAdminSummary();

        setSummary({
          totalSeats: data.totalSeats ?? 0,
          reserved: data.reserved ?? 0,
          cancelled: data.cancelled ?? 0,
        });
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    };

    void fetchSummary();

    window.addEventListener("concert-summary:refresh", fetchSummary);

    return () => {
      window.removeEventListener("concert-summary:refresh", fetchSummary);
    };
  }, []);

  return (
    <>
      <div className="-mx-4 overflow-x-auto px-4 pb-2 no-scrollbar md:mx-0 md:overflow-visible md:px-0 md:pb-0">
        <div className="flex min-w-max gap-3 md:grid md:min-w-0 md:grid-cols-3 md:gap-5">
          <div className="relative min-h-23 w-37.5 overflow-hidden rounded-lg bg-[#087cac] p-3 text-white shadow-md md:min-h-0 md:w-auto md:px-6 md:py-4 md:text-center">
            <FiUser className="absolute bottom-2 left-2 text-[22px] opacity-90 md:static md:mx-auto md:mb-2 md:text-[25px]" />
            <p className="text-right text-[28px] font-bold leading-none md:mt-4 md:text-center md:text-[38px] md:font-light">
              {summary.totalSeats.toLocaleString()}
            </p>
            <p className="mt-1 text-right text-[11px] md:text-center md:text-[15px]">
              Total of seats
            </p>
          </div>

          <div className="relative min-h-23 w-37.5 overflow-hidden rounded-lg bg-[#08a88f] p-3 text-white shadow-md md:min-h-0 md:w-auto md:px-6 md:py-4 md:text-center">
            <FiAward className="absolute bottom-2 left-2 text-[22px] opacity-90 md:static md:mx-auto md:mb-2 md:text-[25px]" />
            <p className="text-right text-[28px] font-bold leading-none md:mt-4 md:text-center md:text-[38px] md:font-light">
              {summary.reserved.toLocaleString()}
            </p>
            <p className="mt-1 text-right text-[11px] md:text-center md:text-[15px]">
              Reserve
            </p>
          </div>

          <div className="relative min-h-23 w-37.5 overflow-hidden rounded-lg bg-[#eb4b4f] p-3 text-white shadow-md md:min-h-0 md:w-auto md:px-6 md:py-4 md:text-center">
            <FiXCircle className="absolute bottom-2 left-2 text-[22px] opacity-90 md:static md:mx-auto md:mb-2 md:text-[25px]" />
            <p className="text-right text-[28px] font-bold leading-none md:mt-4 md:text-center md:text-[38px] md:font-light">
              {summary.cancelled.toLocaleString()}
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
