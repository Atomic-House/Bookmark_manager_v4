import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";

export function useCreate<T, B>(
  mutationKey: string,
  { ...body }: B,
  typeId?: "workspace" | "board" | "view" | "list" | "inbox" | "bookmark",
  mutationType?: "create" | "update" | "delete" | "trash",
) {
  const {
    mutateAsync,
    isSuccess,
    isError,
    isLoading,
    reset,
    failureReason,
    data,
    error,
  } = useMutation({
    mutationKey: [mutationKey, typeId],
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      const d = await fetch(`/api/data/${typeId}/create`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      return (await d.json()) as T;
    },
  });
  return {
    mutateAsync,
    data,
    isSuccess,
    isError,
    isLoading,
    reset,
    failureReason,
    error,
  };
}
