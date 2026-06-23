import { Reveal } from "./Motion";

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden bg-watercolor px-6 pb-14 pt-40 sm:pt-48">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="font-script text-3xl text-rose">{eyebrow}</span>
          <h1 className="mt-1 font-display text-5xl font-semibold leading-[1.04] tracking-tight text-ink sm:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {subtitle}
            </p>
          )}
          {children}
        </Reveal>
      </div>
    </header>
  );
}
