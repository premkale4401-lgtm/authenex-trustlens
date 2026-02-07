import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface UserLike {
  uid: string;
  email: string | null;
  name: string | null;
  photoURL: string | null;
}

export const ensureUserInDB = async (user: UserLike) => {
  if (!user || !user.uid) return;

  const ref = doc(db, "users", user.uid);
  
  try {
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      const userData = {
        uid: user.uid,
        email: user.email,
        name: user.name, // UserLike already normalized 'name'
        photoURL: user.photoURL, // UserLike already normalized 'photoURL'
        createdAt: new Date(),
      };
      
      await setDoc(ref, userData);
    }
  } catch (error) {
    // Don't throw, just log in dev, or suppress in prod.
  }
};
