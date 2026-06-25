import { copy, type Language } from "../lib/i18n";

type NavbarProps = {
  language: Language;
  onToggleLanguage: () => void;
};

export function Navbar({ language, onToggleLanguage }: NavbarProps) {
  const t = copy[language].nav;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-5">
      <a href={import.meta.env.BASE_URL} className="inline-flex items-center">
        <img
          src="https://evinka.tech/wp-content/themes/evinka/images/logo-white.svg"
          alt="EVINKA"
          className="h-8 md:h-10 lg:h-11 w-auto object-contain"
        />
      </a>
      <button
        type="button"
        className="rounded-full border border-primary/35 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary shadow-[0_12px_30px_rgba(0,0,0,0.28)] outline-none transition hover:border-primary hover:bg-primary hover:text-primary-foreground focus:border-primary"
        onClick={onToggleLanguage}
      >
        {t.toggle}
      </button>
    </nav>
  );
}
