"use client";

import { useRouter } from "next/navigation";
import { FiSave, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

export default function AdminCreateConcertPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.success("Created successfully");

    setTimeout(() => {
      router.push("/admin/concerts/overview");
    }, 800);
  };

  return (
    <div className="rounded-md border border-[#d8d8d8] bg-white px-7 py-7">
      <h1 className="text-[34px] font-bold text-[#1e88e5]">Create</h1>

      <div className="mt-5 border-t border-[#e5e5e5]" />

      <form className="mt-7 space-y-7" onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-3 block text-[18px] text-black">
              Concert Name
            </label>

            <input
              type="text"
              placeholder="Please input concert name"
              className="h-11.5 w-full rounded border border-[#9b9b9b] px-4 text-[15px] text-black outline-none placeholder:text-[#b7b7b7] focus:border-[#2196e8]"
            />
          </div>

          <div>
            <label className="mb-3 block text-[18px] text-black">
              Total of seat
            </label>

            <div className="flex h-11.5 items-center rounded border border-[#9b9b9b] px-4 focus-within:border-[#2196e8]">
              <input
                type="number"
                defaultValue={500}
                className="h-full w-full bg-transparent text-[15px] text-black outline-none"
              />

              <FiUser className="text-[18px] text-black" />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-3 block text-[18px] text-black">
            Description
          </label>

          <textarea
            rows={5}
            placeholder="Please input description"
            className="w-full resize-none rounded border border-[#9b9b9b] px-4 py-3 text-[15px] text-black outline-none placeholder:text-[#b7b7b7] focus:border-[#2196e8]"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex h-12 w-35 items-center justify-center gap-2 rounded bg-[#2196e8] text-[20px] font-semibold text-white transition hover:bg-[#1686d3]"
          >
            <FiSave className="text-[18px]" />
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
