import { useQuery } from "@tanstack/react-query";

export function useFetch<T>(
  id: string,
  queryKey: "list" | "workspace" | "board" | "bookmarks" | "view" | "inbox",
) {
  const data = useQuery<T>({
    queryKey: [queryKey, id],
    queryFn: async () => {
      const data = await fetch(`/api/data/${queryKey}/read`, {
        method: "GET",
        body: JSON.stringify({ id: id }),
      });
      return await data.json();
    },
  });
  return data;
}
