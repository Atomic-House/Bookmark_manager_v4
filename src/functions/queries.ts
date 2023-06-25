import { useQuery } from "@tanstack/react-query";

export function useFetchWorkspace() {
  const {
    data: workspace,
    isError,
    isStale,
    isPaused,
    isSuccess,
    isFetching,
    isLoading,
    isLoadingError,
    refetch,
  } = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const data = await fetch("/api/data/workspace/read", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      return await data.json();
    },
  });
  return {
    workspace,
    isError,
    isStale,
    isPaused,
    isSuccess,
    isFetching,
    isLoading,
    isLoadingError,
    refetch,
  };
}
export async function useFetchData(category: string) {
  const {
    data,
    isError,
    isStale,
    isPaused,
    isSuccess,
    isFetching,
    isLoading,
    isLoadingError,
    refetch,
  } = useQuery({
    queryKey: [category],
    queryFn: async (parentId) => {
      const data = await fetch(`/api/data/${category}/${parentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      return await data.json();
    },
  });
  return {
    data,
    isError,
    isStale,
    isPaused,
    isSuccess,
    isFetching,
    isLoading,
    isLoadingError,
    refetch,
  };
}
