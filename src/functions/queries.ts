import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

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
export function useFetchData(
  category: string,
  parentId: string,
  interval: number | false,
) {
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
export function useFetchTrash(category: string) {
  const session = useSession();
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
    queryKey: [category, session.data?.user?.email],
    queryFn: async () => {
      const data = await fetch(`/api/data/trash/${category}/read`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
    error,
    refetch,
  };
}
export function useFetchInbox(wsId: string) {
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
    queryKey: [wsId],
    queryFn: async () => {
      const data = await fetch(`/api/data/inbox/${wsId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
    error,
    refetch,
  };
}
