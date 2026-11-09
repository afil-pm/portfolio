// src/app/(admin)/contact-submissions/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Submission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
};

const STATUS_VARIANT: Record<string, string> = {
  new: "brand",
  read: "outline",
  replied: "emerald",
  archived: "outline",
  spam: "destructive",
};

export default function AdminContactSubmissions() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/contact-submissions", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => { setItems(Array.isArray(data) ? data : []); })
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = (id: string, status: string) => {
    fetch("/api/contact-submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    }).then(() => {
      setItems(items.map((i) => (i.id === id ? { ...i, status } : i)));
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text">Contact Submissions</h1>
      {loading ? <p className="text-muted">Loading...</p> : null}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border/50 text-left text-muted text-xs uppercase tracking-wider">
              <th className="pb-4 pr-4">Name</th>
              <th className="pb-4 pr-4">Email</th>
              <th className="pb-4 pr-4">Subject</th>
              <th className="pb-4 pr-4">Status</th>
              <th className="pb-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {items.map((item) => (
              <tr key={item.id} className="group hover:bg-surface/30 transition-colors">
                <td className="pb-4 pr-4 font-medium text-text">{item.name}</td>
                <td className="pb-4 pr-4 text-text">{item.email}</td>
                <td className="pb-4 pr-4 text-sm text-muted line-clamp-1 max-w-xs">{item.subject}</td>
                <td className="pb-4 pr-4">
                  <select
                    value={item.status}
                    onChange={(e) => updateStatus(item.id, e.target.value)}
                    className="bg-transparent border-none text-xs text-brand focus:ring-0 cursor-pointer"
                  >
                    {["new", "read", "replied", "archived", "spam"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="pb-4 text-xs text-muted">{new Date(item.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="py-10 text-center text-muted">No submissions.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
