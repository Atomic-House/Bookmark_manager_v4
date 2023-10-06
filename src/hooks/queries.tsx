import { ListWithBookmarks } from "@/schema/list";
import { useQueries, useQuery } from "@tanstack/react-query";

export function useFetch<T>(
  id: string,
  queryKey: "list" | "workspace" | "board" | "bookmark" | "view" | "inbox",
  isDeleted?: boolean,
  refetchInterval?: number | false,
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
