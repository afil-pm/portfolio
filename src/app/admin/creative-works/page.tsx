// src/app/(admin)/creative-works/page.tsx
import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminCreativeWorks() {
  return (
    <ResourceManager
      title="Creative Works"
      api="/api/creative-works"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "type", label: "Type (video/image)", required: true },
        { name: "category", label: "Category", required: true },
        { name: "url", label: "URL", type: "url", required: true },
        { name: "thumbnail", label: "Thumbnail URL", type: "url" },
        { name: "duration", label: "Duration", type: "text" },
        { name: "order", label: "Order", type: "number" },
        { name: "isPublished", label: "Published", type: "boolean" },
      ]}
      createDefaults={{ order: 0, isPublished: true, type: "video" }}
    />
  );
}
