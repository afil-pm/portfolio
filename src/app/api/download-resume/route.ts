// src/app/api/download-resume/route.ts
export async function GET() {
  // Placeholder: in production, return a real resume file URL (e.g., from S3/R2)
  return new Response(
    JSON.stringify({ message: "Resume download endpoint. Add your resume URL here." }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
