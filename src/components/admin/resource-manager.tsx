// src/components/admin/resource-manager.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Trash2, Edit3, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ResourceItem = Record<string, any> & { id?: string };

type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "number" | "url" | "email" | "textarea" | "boolean" | "array";
  required?: boolean;
  placeholder?: string;
};

interface ResourceManagerProps {
  title: string;
  api: string;
  fields: FieldConfig[];
  itemSubtitle?: (item: ResourceItem) => string;
  itemBadge?: (item: ResourceItem) => { label: string; variant?: string };
  createDefaults?: ResourceItem;
}

export function ResourceManager({
  title,
  api,
  fields,
  itemSubtitle,
  itemBadge,
  createDefaults = {},
}: ResourceManagerProps) {
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ResourceItem | null>(null);
  const [form, setForm] = useState<ResourceItem>(createDefaults);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(api, { cache: "no-store" });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => { load(); }, [load]);

  const getCsrf = useCallback(async () => {
    const res = await fetch("/api/auth/csrf");
    const data = await res.json();
    return (data.csrfToken || "") as string;
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...createDefaults });
    setError("");
    setOpen(true);
  };

  const openEdit = (item: ResourceItem) => {
    setEditing(item);
    setForm({ ...item });
    setError("");
    setOpen(true);
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const token = await getCsrf();
    const body: ResourceItem = {};
    for (const f of fields) {
      if (f.type === "boolean") {
        body[f.name] = form[f.name] === true || form[f.name] === "true";
      } else if (f.type === "array") {
        body[f.name] = String(form[f.name] || "").split(",").map((t) => t.trim()).filter(Boolean);
      } else if (f.type === "number") {
        body[f.name] = Number(form[f.name] || 0);
      } else {
        body[f.name] = form[f.name] || "";
      }
    }
    const url = editing ? `${api}/${editing.id}` : api;
    const method = editing ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": token },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setOpen(false);
      load();
    } catch (err: any) {
      setError(err.message || "Save failed");
    }
  }, [form, editing, fields, api, createDefaults, getCsrf, load]);

  const remove = useCallback(async (id: string) => {
    if (!confirm("Delete this item?")) return;
    const token = await getCsrf();
    try {
      const res = await fetch(`${api}/${id}`, { method: "DELETE", headers: { "X-CSRF-TOKEN": token } });
      if (!res.ok) throw new Error("Delete failed");
      load();
    } catch (err: any) {
      setError(err.message || "Delete failed");
    }
  }, [api, getCsrf, load]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-text">{title}</h1>
        <Button variant="brand" onClick={openCreate}>
          <Plus className="ml-1 h-4 w-4" /> Add
        </Button>
      </div>

      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">{error}</div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border/50 text-left text-muted text-xs uppercase tracking-wider">
              {fields.map((f) => <th key={f.name} className="pb-3 pr-4">{f.label}</th>)}
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {items.map((item) => (
              <tr key={item.id} className="group hover:bg-surface/30 transition-colors">
                {fields.map((f) => {
                  let cell = String(item[f.name] || "");
                  if (f.type === "array") cell = (item[f.name] || []).join(", ");
                  return (
                    <td key={f.name} className="pb-4 pr-4">
                      {f.type === "boolean" ? (
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${item[f.name] ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-surface text-muted border border-border"}`}>
                          {item[f.name] ? "Yes" : "No"}
                        </span>
                      ) : (
                        <span className="text-text">{cell}</span>
                      )}
                    </td>
                  );
                })}
                <td className="pb-4 pr-4">
                  {itemBadge ? (
                    <Badge variant="outline">{itemBadge(item).label}</Badge>
                  ) : (
                    <span className="text-xs text-muted">{item.isPublished === false ? "Draft" : "Published"}</span>
                  )}
                </td>
                <td className="pb-4">
                  <Button variant="outline" size="sm" onClick={() => openEdit(item)} className="mr-2">
                    <Edit3 className="ml-1 h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => item.id && remove(item.id)} className="text-red-400 hover:bg-red-500/10">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={fields.length + 2} className="py-10 text-center text-muted">No items found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${open ? "block" : "hidden"} bg-black/60 backdrop-blur`} onClick={() => setOpen(false)}>
        <Card className="w-full max-w-lg p-0 mb-8 relative" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between p-5 border-b border-border/50">
            <h3 className="font-semibold text-text">{editing ? "Edit" : "Add"} {title}</h3>
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {fields.map((f) => {
              if (f.type === "boolean") {
                return (
                  <div key={f.name} className="flex items-center gap-2 text-sm cursor-pointer select-none">
                    <input type="checkbox" checked={form[f.name] === true || form[f.name] === "true"} onChange={(e: any) => setForm({ ...form, [f.name]: e.target.checked })} />
                    {f.label}
                  </div>
                );
              }
              const Comp = f.type === "textarea" ? Textarea : Input;
              return (
                <div key={f.name} className="space-y-2">
                  <Label htmlFor={`f-${f.name}`}>{f.label}{f.required && <span className="text-red-500 ml-1">*</span>}</Label>
                  <Comp
                    id={`f-${f.name}`}
                    name={f.name}
                    type={f.type === "textarea" ? "text" : f.type}
                    rows={f.type === "textarea" ? 3 : undefined}
                    placeholder={f.placeholder || undefined}
                    value={String(form[f.name] || "")}
                    onChange={(e: any) => setForm({ ...form, [f.name]: e.target.value })}
                    required={f.required}
                  />
                </div>
              );
            })}
            <Button type="submit" variant="brand" disabled={loading} className="w-full">
              {loading ? <Save className="mr-2 h-4 w-4" /> : ""} {editing ? "Update" : "Create"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
