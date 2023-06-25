import { useQuery } from "@tanstack/react-query";
import prisma from "@/lib/prisma";

export function useFetchQuery(catergory: string | any) {
  const {} = useQuery({
    queryKey: [catergory],
  });
}
