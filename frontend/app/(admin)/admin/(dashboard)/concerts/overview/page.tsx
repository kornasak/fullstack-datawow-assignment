"use client";

import { DeleteConcertModal } from "@/components/modals/DeleteConcertModal";
import { Pagination } from "@/components/ui/Pagination";
import { concerts } from "@/mocks/concert";
import { useMemo, useState } from "react";
import { FiTrash2, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

const initialConcerts = concerts;

export default function AdminOverviewConcertsPage() {
  const [concerts, setConcerts] = useState(initialConcerts);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [selectedConcert, setSelectedConcert] = useState<
    (typeof initialConcerts)[number] | null
  >(null);

  const totalItems = concerts.length;

  const paginatedConcerts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return concerts.slice(start, start + pageSize);
  }, [concerts, page, pageSize]);

  const handleDelete = () => {
    if (!selectedConcert) return;

    setConcerts((prev) =>
      prev.filter((item) => item.id !== selectedConcert.id),
    );

    toast.success("Delete successfully");
    setSelectedConcert(null);
  };

  return (
    <>
      <div className="space-y-7">
        {paginatedConcerts.map((concert) => (
          <article
            key={concert.id}
            className="rounded border border-[#d8d8d8] bg-white px-6 py-6"
          >
            <h2 className="text-[21px] font-bold text-[#1e88e5]">
              {concert.name}
            </h2>

            <div className="mt-3 border-t border-[#e5e5e5]" />

            <p className="mt-4 text-[16px] leading-6 text-black">
              {concert.description}
            </p>

            <div className="mt-7 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[16px] text-black">
                <FiUser />
                {concert.seats}
              </div>

              <button
                type="button"
                className="flex h-9.25 w-24.75 items-center justify-center gap-2 rounded bg-[#eb4b4f] font-semibold text-white"
                onClick={() => setSelectedConcert(concert)}
              >
                <FiTrash2 />
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      <Pagination
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />

      <DeleteConcertModal
        open={!!selectedConcert}
        concertName={selectedConcert?.name}
        onClose={() => setSelectedConcert(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}
