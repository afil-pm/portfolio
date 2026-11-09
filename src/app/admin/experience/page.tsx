// src/app/(admin)/experience/page.tsx
import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminExperience() {
  return (
    <ResourceManager
      title="Experience"
      api="/api/experience"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "company", label: "Company", required: true },
        { name: "type", label: "Type", required: true },
        { name: "startDate", label: "Start Date", type: "text", required: true },
        { name: "endDate", label: "End Date", type: "text" },
        { name: "present", label: "Present", type: "boolean" },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "order", label: "Order", type: "number" },
        { name: "isPublished", label: "Published", type: "boolean" },
      ]}
      createDefaults={{ order: 0, isPublished: true, present: false }}
    />
  );
}
