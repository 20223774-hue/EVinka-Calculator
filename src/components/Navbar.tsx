export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-5">
      <a href={import.meta.env.BASE_URL} className="inline-flex items-center">
        <img
          src="https://evinka.tech/wp-content/themes/evinka/images/logo-white.svg"
          alt="EVINKA"
          className="h-8 md:h-10 lg:h-11 w-auto object-contain"
        />
      </a>
    </nav>
  );
}
