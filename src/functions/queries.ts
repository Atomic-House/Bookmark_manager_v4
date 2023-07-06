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
    error,
  } = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const data = await fetch("/api/data/workspaces/read", {
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
    error,
  };
}
export function useFetchData(category: string, parentId: string, interval: number) {
  const {
    data,
    isError,
    isStale,
    isPaused,
    isSuccess,
    isFetching,
    error,
    isLoading,
    isLoadingError,
    refetch,
  } = useQuery({
    queryKey: [category, parentId],
    queryFn: async () => {
      const data = await fetch(`/api/data/${category}/${parentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      return await data.json();
    },
    refetchInterval: interval,
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
    error,
    refetch,
  };
}
