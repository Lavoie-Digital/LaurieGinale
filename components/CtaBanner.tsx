import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Motion";

export default function CtaBanner({
  eyebrow = "Une idée en tête ?",
  title,
  text,
  cta = "Faire une demande",
  href = "/contact",
}: {
  eyebrow?: string;
  title: string;
  text: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="px-6 py-20">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-8 py-14 text-center shadow-[0_30px_80px_-40px_rgba(106,63,134,0.7)] sm:px-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(30rem 22rem at 12% 0%, rgba(179,136,217,0.5), transparent 60%), radial-gradient(28rem 22rem at 95% 100%, rgba(225,75,138,0.45), transparent 60%), radial-gradient(24rem 20rem at 70% 10%, rgba(246,221,138,0.28), transparent 60%)",
            }}
          />
          <div className="relative">
            <span className="font-script text-3xl text-rose-soft">{eyebrow}</span>
            <h2 className="mx-auto mt-1 max-w-2xl font-display text-3xl font-semibold leading-tight text-cream sm:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-cream/75">{text}</p>
            <Link
              href={href}
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-rose px-8 py-4 text-base font-semibold text-white shadow-[0_18px_45px_-15px_rgba(225,75,138,0.9)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
