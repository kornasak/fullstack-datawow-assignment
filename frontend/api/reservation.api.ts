import { apiClient } from "@/lib/axios";
import { paths } from "@/types/api";

export type GetConcertReservationHistoryPath =
  paths["/reservations/admin/history"]["get"];

export type GetConcertReservationHistoryParam =
  GetConcertReservationHistoryPath["parameters"]["query"];
export type GetConcertReservationHistoryResponse =
  GetConcertReservationHistoryPath["responses"]["200"]["content"]["application/json"];

export async function getConcertReservationHistory(
  params?: GetConcertReservationHistoryParam,
): Promise<GetConcertReservationHistoryResponse> {
  const { data } = await apiClient.get("/reservations/admin/history", {
    params,
  });
  return data;
}
