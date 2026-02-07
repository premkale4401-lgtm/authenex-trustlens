"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { collection, query, where, orderBy, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatDistanceToNow } from "date-fns";
import { Clock, Activity } from "lucide-react";

export default function ScanHistory() {
  const { user } = useAuthContext();
  const [scans, setScans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      if (!user) return;

      try {
        const q = query(
          collection(db, "scans"),
          where("uid", "==", user.uid),
          orderBy("createdAt", "desc"),
          limit(10)
        );

        const querySnapshot = await getDocs(q);
        const history = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setScans(history);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, [user]);

  if (!user) return null;

  if (loading) {
    return <div className="p-4 text-center text-slate-500 animate-pulse">Loading history...</div>;
  }

  if (scans.length === 0) {
    return (
      <div className="text-center py-8 border border-dashed border-slate-800 rounded-xl">
        <p className="text-slate-500">No scan history found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-4 h-4 text-sky-400" />
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Recent Scans</h3>
      </div>

      <div className="grid gap-3">
        {scans.map((scan) => (
          <div 
            key={scan.id} 
            className="p-4 bg-slate-900/50 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
               <div className={`
                 w-2 h-10 rounded-full
                 ${scan.verdict === 'Likely AI' ? 'bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 
                   scan.verdict === 'Likely Human' ? 'bg-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 
                   'bg-amber-500/50'}
               `} />
               
               <div>
                 <p className="text-slate-200 font-medium">
                   {scan.verdict}
                 </p>
                 <p className="text-xs text-slate-500 flex items-center gap-1">
                   {scan.createdAt?.seconds ? formatDistanceToNow(new Date(scan.createdAt.seconds * 1000)) + " ago" : "Just now"}
                 </p>
               </div>
            </div>

            <div className="text-right">
              <span className="text-sky-400 font-mono font-bold">{scan.confidence}%</span>
              <p className="text-xs text-slate-600">Confidence</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
