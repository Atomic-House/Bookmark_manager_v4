import { useMutation } from "@tanstack/react-query";

export const useMutations = (
  mutationKey: string,
  category: string,
  name: string,
  additionalParams: any
) => {
  const {} = useMutation({
    mutationKey: [mutationKey, category],
    mutationFn: async () => {},
  });
};
