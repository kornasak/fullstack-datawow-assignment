"use client";

import {
  getConcertsForAdmin,
  removeConcert,
  type GetConcertsForAdminResponse,
} from "@/api/concert.api";
import { DeleteConcertModal } from "@/components/modals/DeleteConcertModal";
import { Pagination } from "@/components/ui/Pagination";
import { getErrorMessage } from "@/helper/axios";
import { useEffect, useState } from "react";
import { FiTrash2, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

type ConcertItem = GetConcertsForAdminResponse["items"][number];

export default function AdminOverviewConcertsPage() {
  const [concerts, setConcerts] = useState<ConcertItem[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  const [selectedConcert, setSelectedConcert] = useState<ConcertItem | null>(
    null,
  );

  const fetchConcerts = async (
    currentPage = page,
    currentPageSize = pageSize,
  ) => {
    try {
      setLoading(true);

      const data = await getConcertsForAdmin({
        page: currentPage,
        limit: currentPageSize,
      });

      setConcerts(data.items);
      setTotalItems(data.meta.total);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchConcerts = async (
      currentPage = page,
      currentPageSize = pageSize,
    ) => {
      try {
        setLoading(true);

        const data = await getConcertsForAdmin({
          page: currentPage,
          limit: currentPageSize,
        });

        setConcerts(data.items);
        setTotalItems(data.meta.total);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    void fetchConcerts(page, pageSize);
  }, [page, pageSize]);

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  const handlePageSizeChange = (nextPageSize: number) => {
    setPageSize(nextPageSize);
    setPage(1);
  };

  const handleDelete = async () => {
    if (!selectedConcert) return;

    await removeConcert(selectedConcert.id);

    window.dispatchEvent(new Event("concert-summary:refresh"));
    await fetchConcerts(page, pageSize);

    toast.success("Delete successfully");
    setSelectedConcert(null);
  };

  if (loading) {
    return <div className="text-center text-black">Loading...</div>;
  }

  return (
    <>
      {concerts.length === 0 ? (
        <div className="flex min-h-[calc(100dvh-8rem)] items-center justify-center rounded border border-dashed border-[#d8d8d8] bg-white px-5 py-10">
          <div className="text-center">
            <h2 className="text-[24px] font-bold text-[#1e88e5]">
              No concerts available
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              There are currently no concerts in the system.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-7">
          {concerts.map((concert) => (
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
                  {concert.totalSeats.toLocaleString()}
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
      )}

      {totalItems > 0 && (
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}

      <DeleteConcertModal
        open={!!selectedConcert}
        concertName={selectedConcert?.name}
        onClose={() => setSelectedConcert(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}
