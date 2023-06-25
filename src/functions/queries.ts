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
      const data = await fetch("http://localhost:3000/api/data/workspace/read", {
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
export function useFetchData(){

}
