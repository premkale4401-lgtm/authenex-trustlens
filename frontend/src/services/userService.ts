import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { User } from "firebase/auth";

export const saveUserToDB = async (user: User) => {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      createdAt: new Date(),
    });
  }
};
