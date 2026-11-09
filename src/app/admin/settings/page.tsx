// src/app/(admin)/settings/page.tsx
"use client";

import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text">Settings</h1>
      <div className="glass-card p-6">
        <h3 className="font-semibold text-text mb-4">Social Links</h3>
        <p className="text-muted text-sm mb-4">Manage your social media links displayed in the footer.</p>
        <ResourceManager
          title="Social Links"
          api="/api/social-links"
          fields={[
            { name: "platform", label: "Platform", required: true },
            { name: "url", label: "URL", type: "url", required: true },
            { name: "icon", label: "Icon (Lucide name)", required: true },
            { name: "order", label: "Order", type: "number" },
            { name: "isActive", label: "Active", type: "boolean" },
          ]}
          createDefaults={{ order: 0, isActive: true }}
        />
      </div>
    </div>
  );
}
