"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { ensureUserInDB } from "@/lib/db/users";

export function AuthSync() {
  const { data: session, status } = useSession();
  const syncedRef = useRef(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user && !syncedRef.current) {
      // Cast NextAuth session user to our generic UserLike interface
      // Note: NextAuth user id might be mapped to 'id' or 'sub' (but we ensure it in authOptions callbacks)
      // If we don't have an ID, we can't sync.
      const userId = (session.user as any).id || (session.user as any).uid;
      
      if (userId) {
        ensureUserInDB({
          uid: userId,
          email: session.user.email || null,
          name: session.user.name || null,
          photoURL: session.user.image || null,
        }).then(() => {
            syncedRef.current = true;
        });
      }
    }
  }, [session, status]);

  return null;
}
