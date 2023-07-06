import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent } from "react";

export const useMutations = (
  mutationKey: string,
  category: string,
  name: string,
  url: string,
  additionalParams: string | null | undefined,
  fetchType: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
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
        body: JSON.stringify({ name: name, url: url }),
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
export function useDnd(source: string, destination: string, bookmarkId: string) {
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
