import { apiClient } from "@/lib/axios";
import { paths } from "@/types/api";

export type GetConcertPath = paths["/concerts"]["get"];
export type CreateConcertPath = paths["/concerts"]["post"];
export type GetConcertsForAdminPath = paths["/concerts/admin"]["get"];
export type GetConcertAdminSummaryPath =
  paths["/concerts/admin/summary"]["get"];
export type RemoveConcertPath = paths["/concerts/{id}"]["delete"];
export type ReserveConcertPath = paths["/concerts/{id}/reserve"]["post"];
export type CancelConcertReservationPath =
  paths["/concerts/{id}/reserve"]["delete"];

export type GetConcertParam = GetConcertPath["parameters"]["query"];
export type GetConcertResponse =
  GetConcertPath["responses"]["200"]["content"]["application/json"];
export type GetConcertsForAdminParam =
  GetConcertsForAdminPath["parameters"]["query"];
export type GetConcertsForAdminResponse =
  GetConcertsForAdminPath["responses"]["200"]["content"]["application/json"];
export type GetConcertAdminSummaryResponse =
  GetConcertAdminSummaryPath["responses"]["200"]["content"]["application/json"];
export type CreateConcertRequest =
  CreateConcertPath["requestBody"]["content"]["application/json"];
export type CreateConcertResponse =
  CreateConcertPath["responses"]["201"]["content"]["application/json"];
export type RemoveConcertResponse = RemoveConcertPath["responses"]["204"];

export async function getConcerts(
  params?: GetConcertParam,
): Promise<GetConcertResponse> {
  const { data } = await apiClient.get("/concerts", { params });
  return data;
}

export async function concertReservation(concertId: number) {
  const { data } = await apiClient.post(`/concerts/${concertId}/reserve`);
  return data;
}

export async function cancelConcertReservation(concertId: number) {
  const { data } = await apiClient.delete(`/concerts/${concertId}/reserve`);
  return data;
}

export async function getConcertsForAdmin(
  params?: GetConcertsForAdminParam,
): Promise<GetConcertsForAdminResponse> {
  const { data } = await apiClient.get("/concerts/admin", { params });
  return data;
}

export async function getConcertAdminSummary(): Promise<GetConcertAdminSummaryResponse> {
  const { data } = await apiClient.get("/concerts/admin/summary");
  return data;
}

export async function createConcert(
  payload: CreateConcertRequest,
): Promise<CreateConcertResponse> {
  const { data } = await apiClient.post("/concerts", payload);
  return data;
}

export async function removeConcert(
  concertId: number,
): Promise<RemoveConcertResponse> {
  const { data } = await apiClient.delete(`/concerts/${concertId}`);
  return data;
}
