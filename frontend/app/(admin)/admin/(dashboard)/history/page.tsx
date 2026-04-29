"use client";

import { Pagination } from "@/components/ui/Pagination";
import { faker } from "@faker-js/faker";
import { useMemo, useState } from "react";

faker.seed(99);

const histories = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  datetime: faker.date.recent({ days: 30 }).toLocaleString("th-TH"),
  username: faker.person.fullName(),
  concertName: faker.helpers.arrayElement([
    "The Festival Int 2024",
    "Summer Music Live",
    "Rock Arena Tour",
    "Bangkok EDM Night",
  ]),
  action: faker.helpers.arrayElement(["Reserve", "Cancel"]),
}));

export default function AdminHistoryPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalItems = histories.length;

  const paginatedHistories = useMemo(() => {
    const start = (page - 1) * pageSize;
    return histories.slice(start, start + pageSize);
  }, [page, pageSize]);

  return (
    <div className="px-4 py-6 md:px-8 md:py-12">
      {/* Mobile Card List */}
      <div className="space-y-3 md:hidden">
        {paginatedHistories.map((item) => (
          <article
            key={item.id}
            className="rounded-md border border-[#d8d8d8] bg-white p-4 text-black"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[15px] font-bold">{item.concertName}</p>
                <p className="mt-1 text-[13px] text-gray-500">
                  {item.datetime}
                </p>
              </div>

              <span
                className={`shrink-0 rounded px-2.5 py-1 text-[12px] font-semibold ${
                  item.action === "Cancel"
                    ? "bg-red-100 text-red-600"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {item.action}
              </span>
            </div>

            <div className="mt-4 border-t border-[#eeeeee] pt-3">
              <p className="text-[13px] text-gray-500">Username</p>
              <p className="text-[15px] font-medium">{item.username}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-[3px] border border-[#8f8f8f] bg-white md:block">
        <div className="grid grid-cols-4 border-b border-[#8f8f8f] text-[16px] font-bold text-black">
          <div className="border-r border-[#8f8f8f] px-3 py-2">Date time</div>
          <div className="border-r border-[#8f8f8f] px-3 py-2">Username</div>
          <div className="border-r border-[#8f8f8f] px-3 py-2">
            Concert name
          </div>
          <div className="px-3 py-2">Action</div>
        </div>

        {paginatedHistories.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-4 border-b border-[#8f8f8f] text-[14px] text-black last:border-b-0"
          >
            <div className="border-r border-[#8f8f8f] px-3 py-2">
              {item.datetime}
            </div>
            <div className="border-r border-[#8f8f8f] px-3 py-2">
              {item.username}
            </div>
            <div className="border-r border-[#8f8f8f] px-3 py-2">
              {item.concertName}
            </div>
            <div className="px-3 py-2">{item.action}</div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}
