"use client";

import { createConcert } from "@/api/concert.api";
import { getErrorMessage } from "@/helper/axios";
import {
  CreateConcertForm,
  CreateConcertInput,
  createConcertSchema,
} from "@/schemas/admin/create-concert.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FiSave, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

export default function AdminCreateConcertPage() {
  const router = useRouter();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateConcertInput, unknown, CreateConcertForm>({
    resolver: zodResolver(createConcertSchema),
    defaultValues: {
      name: "",
      totalSeats: 1,
      description: "",
    },
  });

  const onSubmit = async (values: CreateConcertForm) => {
    try {
      await createConcert(values);

      toast.success("Created successfully");
      window.dispatchEvent(new Event("concert-summary:refresh"));
      router.push("/admin/concerts/overview");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="rounded-md border border-[#d8d8d8] bg-white px-7 py-7">
      <h1 className="text-[34px] font-bold text-[#1e88e5]">Create</h1>

      <div className="mt-5 border-t border-[#e5e5e5]" />

      <form className="mt-7 space-y-7" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-3 block text-[18px] text-black">
              Concert Name
            </label>

            <input
              type="text"
              placeholder="Please input concert name"
              className={`h-11.5 w-full rounded border px-4 text-[15px] text-black outline-none placeholder:text-[#b7b7b7] focus:border-[#2196e8] ${
                errors.name ? "border-red-500" : "border-[#9b9b9b]"
              }`}
              {...registerField("name")}
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="mb-3 block text-[18px] text-black">
              Total of seat
            </label>

            <div
              className={`flex h-11.5 items-center rounded border px-4 focus-within:border-[#2196e8] ${
                errors.totalSeats ? "border-red-500" : "border-[#9b9b9b]"
              }`}
            >
              <input
                type="number"
                className="h-full w-full bg-transparent text-[15px] text-black outline-none"
                {...registerField("totalSeats")}
              />

              <FiUser className="text-[18px] text-black" />
            </div>

            {errors.totalSeats && (
              <p className="mt-2 text-sm text-red-500">
                {errors.totalSeats.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="mb-3 block text-[18px] text-black">
            Description
          </label>

          <textarea
            rows={5}
            placeholder="Please input description"
            className={`w-full resize-none rounded border px-4 py-3 text-[15px] text-black outline-none placeholder:text-[#b7b7b7] focus:border-[#2196e8] ${
              errors.description ? "border-red-500" : "border-[#9b9b9b]"
            }`}
            {...registerField("description")}
          />

          {errors.description && (
            <p className="mt-2 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 w-35 items-center justify-center gap-2 rounded bg-[#2196e8] text-[20px] font-semibold text-white transition hover:bg-[#1686d3] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiSave className="text-[18px]" />
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
