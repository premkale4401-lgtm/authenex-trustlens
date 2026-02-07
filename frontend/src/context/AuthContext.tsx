"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useSession } from "next-auth/react";
import { auth, db } from "@/lib/firebase";
import { ensureUserInDB } from "@/lib/db/users";
import { doc, setDoc } from "firebase/firestore";



const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
}>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { data: session, status } = useSession();

  useEffect(() => {
    // If NextAuth has a session, we consider the user logged in
    if (status === "authenticated" && session?.user) {
       // Construct a Firebase-compatible User object from NextAuth session
       const mappedUser = {
         uid: (session.user as any).id || (session.user as any).uid || "unknown", // Ensure ID exists
         email: session.user.email,
         displayName: session.user.name,
         photoURL: session.user.image,
       } as unknown as User;
       
       setUser(mappedUser);
       setLoading(false);
       return;
    }

    const unsub = onAuthStateChanged(auth, async (u) => {
    if (u) {
      try {
        await ensureUserInDB({
          uid: u.uid,
          email: u.email,
          name: u.displayName,
          photoURL: u.photoURL,
        });
        setUser(u);
      } catch (err) {
        // Still set the user even if DB write fails, to allow app access
        setUser(u);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  });

  return () => unsub();
}, [session, status]);



  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
