import { useEffect, useState } from "react";

export function useLoading(isLoading: boolean) {
  const [state, setState] = useState<"loading" | "success">();
  const [style, setStyle] = useState("");
  useEffect(() => {
    if (state === "loading") {
      setStyle("loading loading-ring loading-lg");
    } else {
      setStyle("hidden");
    }
  }, [style, state, isLoading]);
  return <span className={style}></span>;
}
