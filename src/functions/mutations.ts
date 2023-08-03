import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { FormEvent } from "react";

export function useMutations<T>(
  mutationKey: string,
  category: string,
  name: string,
  url: string,
  color: string,
  CRUD: "create" | "read" | "update" | "delete" | string | null | undefined,
  fetchType: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  parent?: string,
  parentId?: string,
) {
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
      const res = await fetch(`/api/data/${category}/${CRUD}`, {
        method: fetchType,
        body: JSON.stringify({ name: name, url: url, color: color }),
      });
      const data: T = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([category]);
      if (parent) {
        queryClient.invalidateQueries([parent, parentId]);
      }
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
}
export function useDnd(id: string) {
  const queryClient = useQueryClient();
  const { mutateAsync, mutate, isSuccess, isError, isLoading, error, reset } =
    useMutation({
      mutationKey: ["usednd", id],
      mutationFn: async ({
        source,
        destination,
        bookmarkId,
      }: {
        source: string;
        destination: string;
        bookmarkId: string;
      }) => {
        await fetch(`/api/data/dnd/${source}/${destination}/${bookmarkId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
      },

      onSuccess: () => {
        queryClient.invalidateQueries(["lists", id]);
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
export function useRestoreTrash(category: string, lId: string) {
  const queryClient = useQueryClient();
  const session = useSession();
  const { mutateAsync, mutate, isSuccess, isError, isLoading, error, reset } =
    useMutation({
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
  const { mutateAsync, mutate, isSuccess, isError, isLoading, error, reset } =
    useMutation({
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
export function useAddEmojiToList(
  id: string,
  { name, emoji, color }: { name: string; emoji: string; color: string | null },
) {
  const { mutateAsync, data, isError, isSuccess, isLoading, error } =
    useMutation({
      mutationKey: ["add emoji", id],
      mutationFn: async () => {
        const data = await fetch(`/api/data/lists/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ name, emoji, color }),
        });
        return await data.json();
      },
    });
  return { mutateAsync, data, isError, isSuccess, isLoading, error };
}

export function useAddTabsToInbox(inboxId: string, name: string) {
  const { mutateAsync, mutate, isSuccess, isError, isLoading, error, reset } =
    useMutation({
      mutationKey: ["tab", inboxId],
      mutationFn: async (e: FormEvent) => {
        e.preventDefault();
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
