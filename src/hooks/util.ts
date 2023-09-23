import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function useOverlayRef() {
  const [open, toggleOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOverlayClose(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        toggleOpen(false);
      }
    }
    if (open) {
      document.addEventListener("click", handleOverlayClose);
    } else {
      document.removeEventListener("click", handleOverlayClose);
    }
  }, [open]);
  return { ref, toggleOpen, open };
}

export function useAuth(id: string) {
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else {
      router.push(`/board/${id}`);
    }
  }, [router, status, id]);
}
