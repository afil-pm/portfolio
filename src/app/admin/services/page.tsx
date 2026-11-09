// src/app/(admin)/services/page.tsx
import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminServices() {
  return (
    <ResourceManager
      title="Services"
      api="/api/services"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "description", label: "Description", type: "textarea" },
        { name: "icon", label: "Icon (Lucide name)", required: true },
        { name: "order", label: "Order", type: "number" },
        { name: "isPublished", label: "Published", type: "boolean" },
      ]}
      createDefaults={{ order: 0, isPublished: true }}
    />
  );
}
