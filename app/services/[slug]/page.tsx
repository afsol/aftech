// app/services/[slug]/page.tsx

import { notFound } from "next/navigation";

export default async function ServiceDetail({ params }: { params: { slug: string } }) {
  const res = await fetch(`http://localhost:3000/services/${params.slug}`);
  if (!res.ok) return notFound();

  const service = await res.json();

  return (
    <main>
      <h1>{service.title}</h1>
      <p>{service.description}</p>
    </main>
  );
}
