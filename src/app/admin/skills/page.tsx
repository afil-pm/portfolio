// src/app/(admin)/skills/page.tsx
import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminSkills() {
  return (
    <ResourceManager
      title="Skills"
      api="/api/skills"
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "category", label: "Category", required: true },
        { name: "icon", label: "Icon (Lucide name)", required: true },
        { name: "order", label: "Order", type: "number" },
        { name: "isPublished", label: "Published", type: "boolean" },
      ]}
      createDefaults={{ order: 0, isPublished: true }}
    />
  );
}
