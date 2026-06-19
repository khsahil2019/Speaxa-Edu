import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-gradient-to-b from-[oklch(0.97_0.04_55)] to-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-14 md:py-20">
        {eyebrow && <div className="text-sm font-bold text-primary uppercase tracking-wider">{eyebrow}</div>}
        <h1 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight max-w-3xl">{title}</h1>
        {description && <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{description}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
