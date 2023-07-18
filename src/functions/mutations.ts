import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { FormEvent } from "react";

export const useMutations = (
  mutationKey: string,
  category: string,
  name: string,
  url: string,
  color: string,
  additionalParams: string | null | undefined,
  fetchType: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
) => {
  const queryClient = useQueryClient();
  const {
    mutateAsync,
    mutate,
    isSuccess,
    isError,
    isLoading,
    error,
    reset,
    data,
    isPaused,
    isIdle,
  } = useMutation({
    mutationKey: [mutationKey, category],
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      await fetch(`/api/data/${category}/${additionalParams}`, {
        method: fetchType,
        body: JSON.stringify({ name: name, url: url, color: color }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([category]);
    },
  });

  return {
    mutateAsync,
    mutate,
    isSuccess,
    isError,
    isLoading,
    error,
    reset,
    data,
    isPaused,
    isIdle,
  };
};
export function useDnd(
  source: string | undefined,
  destination: string | undefined,
  bookmarkId: string | undefined,
) {
  const queryClient = useQueryClient();
  const { mutateAsync, mutate, isSuccess, isError, isLoading, error, reset } = useMutation({
    mutationKey: [source, destination, bookmarkId],
    mutationFn: async () => {
      await fetch(`/api/data/dnd/${source}/${destination}/${bookmarkId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["lists", source]);
    },
  });
  return {
    mutateAsync,
    mutate,
    isSuccess,
    isError,
    isLoading,
    error,
    reset,
  };
}
export function setUserData(name: string, username: string) {}
export function useRestoreTrash(category: string, lId: string) {
  const queryClient = useQueryClient();
  const session = useSession();
  const { mutateAsync, mutate, isSuccess, isError, isLoading, error, reset } = useMutation({
    mutationKey: [category, session?.data?.user?.email, lId],
    mutationFn: async (id: string) => {
      await fetch(`/api/data/trash/${category}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([category]);
    },
  });
  return {
    mutateAsync,
    mutate,
    isSuccess,
    isError,
    isLoading,
    error,
    reset,
  };
}
export function useChangeColor() {
  const { mutateAsync, mutate, isSuccess, isError, isLoading, error, reset } = useMutation({
    mutationFn: async ({ id, color }: { id: string; color: string }) => {
      const res = await fetch(`/api/data/color/${id}/${color}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await res.json();
    },
  });
  return {
    mutateAsync,
    mutate,
    isSuccess,
    isError,
    isLoading,
    error,
    reset,
  };
}
export function useAddTabsToInbox(inboxId: string, name: string) {
  const { mutateAsync, mutate, isSuccess, isError, isLoading, error, reset } = useMutation({
    mutationKey: ["tab",inboxId],
    mutationFn: async (e:FormEvent) => {
      e.preventDefault()
      await fetch(`/api/data/inbox/${inboxId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      });
    },
  });
  return {
    mutateAsync,
    mutate,
    isSuccess,
    isError,
    isLoading,
    error,
    reset,
  };
}
