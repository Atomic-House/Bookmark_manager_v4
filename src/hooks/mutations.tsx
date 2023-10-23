import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent } from "react";
import _ from "lodash";
export function useCreate<T, B>(
  mutationKey: "workspace" | "board" | "view" | "list" | "inbox" | "bookmark",
  body: B,
  typeId?: string,
  prevData?: T[],
) {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationKey: [mutationKey, typeId],
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      const d = await fetch(`/api/data/${mutationKey}/create`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      return (await d.json()) as T;
    },
    onSuccess(data) {
      console.log("Successfully created", mutationKey);
      console.log("Invalidating...", mutationKey, typeId);
      console.log(data);
      console.log(prevData?.concat(data));

      queryClient.setQueryData(
        [mutationKey, { id: typeId }],
        prevData?.concat(data),
      );
    },
  });
  return mutate;
}
export function useTrash<T>(
  mutationKey: "workspace" | "board" | "view" | "list" | "inbox" | "bookmark",
  id: string,
  isDeleting: boolean,
) {
  const queryClient = useQueryClient();
  const mutate = useMutation<T>({
    mutationKey: [mutationKey, id, "trash"],
    mutationFn: async () => {
      const d = await fetch(`/api/trash/${mutationKey}/${id}/trash`, {
        method: "PATCH",
        body: JSON.stringify({ id: id, isDeleting: isDeleting }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await d.json();
    },
    onSuccess() {
      console.log(
        `Successfully ${isDeleting ? "deleted" : "restored"}`,
        mutationKey,
        id,
      );
      console.log("Invalidating...", mutationKey, id);
      queryClient.invalidateQueries([mutationKey, { id: id }]);
    },
    onError(error, variables, context) {
      console.log(error, variables, context);
    },
  });
  return mutate;
}

export function useAddMembers(boardId: string, members: string[]) {
  const mutate = useMutation({
    mutationKey: ["board", boardId, "members"],
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      const res = await fetch(`/api/data/member/create`, {
        method: "POST",
        body: JSON.stringify({ boardId, members }),
      });
      return (await res.json()) as string;
    },
    onSuccess(data) {
      console.log("Successfully added members", data);
    },
  });
  return mutate;
}
