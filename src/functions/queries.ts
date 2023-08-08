
import { WorkspaceWithBoards } from "@/types";
import { User, UserPreferences } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
interface Prefs extends User {
  userPreferences: UserPreferences;
}
//get user along with user preferences
export function useGetUser() {
  const { data: session } = useSession();
  if (!session) {
    redirect("/user/auth/signin");
  }
  const {
    data,
    isError,
    isStale,
    isPaused,
    isFetched,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery<Prefs>({
    queryKey: ["user", session?.user?.email],
    queryFn: async () => {
      const data = await fetch("/api/data/user/read", {
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
    isFetched,
    isLoading,
    isSuccess,
    refetch,
  };
}
//get all workspaces matching the  user and it's email
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
  } = useQuery<WorkspaceWithBoards[]>({
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
export function useFetchData<T>(
  category: string,
  parentId?: string | undefined,
  interval?: number | false,
  parent?: string,
) {
  const { data: session } = useSession();
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
  } = useQuery<T>({
    queryKey: [category, parentId ? parentId : session?.user?.email],
    queryFn: async () => {
      const data = await fetch(
        `/api/data/${category}/${parentId ? parentId : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return await data.json();
    },
    refetchInterval: interval ? interval : false,
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
//Fetches tabs and data from an inbox 
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
