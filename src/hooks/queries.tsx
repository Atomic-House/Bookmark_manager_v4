import { ListWithBookmarks } from "@/schema/list";
import { useQueries, useQuery } from "@tanstack/react-query";

export function useFetch<T>(
  id: string,
  queryKey: "list" | "workspace" | "board" | "bookmark" | "view" | "inbox",
  isDeleted?: boolean,
  refetchInterval?: number | false,
  enabled?: boolean,
) {
  const data = useQuery<T>({
    queryKey: [queryKey, { id: id }],
    queryFn: async () => {
      const data = await fetch(
        `/api/data/${queryKey}/${id}/${String(isDeleted)}/read`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return await data.json();
    },
    refetchInterval: refetchInterval,
    enabled: enabled,
  });
  return data;
}

export function useListQueries(listIds: string[]) {
  const data = useQueries<ListWithBookmarks[]>({
    queries: listIds.map((id) => {
      return {
        queryKey: ["list", id],
        queryFn: async () => {
          const d = await fetch(`/api/data/list/${id}/read`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          return (await d.json()) as ListWithBookmarks;
        },
      };
    }),
  });
  return data;
}
export function useGetTrash<T>(queryKey: "board" | "list" | "bookmark") {
  const data = useQuery<T>({
    queryKey: [queryKey, "trash"],
    queryFn: async () => {
      const d = await fetch(`/api/trash/${queryKey}/trash/read`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return (await d.json()) as T;
    },
  });
  return data;
}
