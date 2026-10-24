type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, intro, id }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="inline-block -rotate-2 rounded-lg bg-saffron px-3 py-1 font-display text-sm font-bold tracking-wide text-char uppercase">{eyebrow}</p>
      <h2 id={id} className="mt-3 font-display text-4xl leading-tight font-extrabold text-balance text-char sm:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-3 text-lg leading-relaxed text-tamarind">{intro}</p>}
    </div>
  );
}
