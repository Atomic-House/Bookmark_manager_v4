import { useQuery } from "@tanstack/react-query";

export function useFetch<T>(
  id: string,
  queryKey: "list" | "workspace" | "board" | "bookmarks" | "view" | "inbox",
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
