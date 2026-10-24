type WordmarkProps = { className?: string; tone?: "light" | "dark" };

/**
 * "BANGKOK99", typeset after the truck's lit sign (yellow capitals on rust red), with the 99 in a
 * saffron badge. They have no logo file, so this is type only.
 */
export function Wordmark({ className = "", tone = "light" }: WordmarkProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 font-display leading-none font-extrabold tracking-tight ${className}`}>
      <span className={tone === "dark" ? "text-saffron-light" : "text-chili"}>BANGKOK</span>
      <span className="inline-flex items-center justify-center rounded-full bg-saffron px-[0.35em] py-[0.12em] text-char">99</span>
    </span>
  );
}
