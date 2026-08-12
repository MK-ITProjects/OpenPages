import { useAuthModal } from '../../app/providers/AuthModalContext.jsx';
import { Link } from "react-router-dom";

const FOOTER_LINKS = [
  '© 2026 OpenPages. All Rights Reserved. Designed & Developed by JKV.',
];

export function LandingPage() {
  const { openLogin, openRegister } = useAuthModal();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-emerald-50 text-slate-900">
      {/* ================= NAVBAR ================= */}

      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">

        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-8">

          {/* Logo */}

          <Link
            to="/"
            className="font-serif text-5xl font-black tracking-tight text-emerald-700 transition hover:text-emerald-600"
          >
            OpenPages
          </Link>

          {/* Desktop Menu */}

          <nav className="hidden items-center gap-10 md:flex">

            <Link
              to="/about"
              className="font-medium text-slate-600 transition hover:text-emerald-600"
            >
              Our Story
            </Link>

            <Link
              to="/membership"
              className="font-medium text-slate-600 transition hover:text-emerald-600"
            >
              Membership
            </Link>

            <button
              type="button"
              onClick={() => openLogin("/write")}
              className="font-medium text-slate-600 transition hover:text-emerald-600"
            >
              Write
            </button>

            <button
              type="button"
              onClick={() => openLogin("/read")}
              className="font-medium text-slate-600 transition hover:text-emerald-600"
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => openRegister("/read")}
              className="
                rounded-full
                bg-gradient-to-r
                from-emerald-600
                to-green-500
                px-7
                py-3
                font-semibold
                text-white
                shadow-lg
                shadow-emerald-500/30
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
              "
            >
              Get Started
            </button>

          </nav>

          {/* Mobile Button */}

          <button
            type="button"
            onClick={() => openRegister("/read")}
            className="rounded-full bg-emerald-600 px-5 py-2 font-semibold text-white md:hidden"
          >
            Get Started
          </button>

        </div>

      </header>

      <main className="relative overflow-hidden flex-1">

  {/* Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-emerald-50" />

  {/* Blur Circles */}
  <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-300 opacity-40 blur-3xl"></div>

  <div className="absolute top-40 right-20 h-96 w-96 rounded-full bg-cyan-200 opacity-50 blur-3xl"></div>

  <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-indigo-200 opacity-30 blur-3xl"></div>

  {/* Grid */}
  <div
    className="absolute inset-0 opacity-20"
    style={{
      backgroundImage:
        "radial-gradient(#d4d4d4 1px, transparent 1px)",
      backgroundSize: "28px 28px",
    }}
  />

  <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center gap-12 px-8 py-20 md:flex-row md:justify-between">

    {/* Left */}

    <div className="max-w-xl">

      

      <h1 className="mt-8 font-serif text-6xl font-extrabold leading-[0.92] tracking-tight text-slate-900 sm:text-7xl md:text-8xl">
        Human
        <br />
        stories &
        <br />
        ideas
      </h1>

      <p className="mt-8 text-xl leading-9 text-slate-500 font-medium">
        A place to read, write, and deepen your understanding
      </p>

      <button
        type="button"
        onClick={() => openRegister('/read')}
        className="mt-10 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 px-10 py-4 text-lg font-semibold text-white shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50"
      >
        Start reading
      </button>

    </div>

    {/* Right */}

    <div className="relative flex justify-center">

      {/* Background Circle */}

      <div className="absolute h-[480px] w-[480px] rounded-full bg-gradient-to-br from-emerald-300 via-green-200 to-cyan-200 opacity-90 blur-sm"></div>

      {/* Floating Cards */}

      <div className="absolute -left-10 top-10 rounded-3xl border border-white/40 bg-white/80 px-6 py-5 backdrop-blur-xl shadow-2xl shadow-slate-200/70 transition-all duration-300 hover:-translate-y-2 hover:shadow-emerald-300/40">
        <p className="text-3xl font-extrabold text-emerald-600"><svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#018e11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-newspaper-icon lucide-newspaper"><path d="M15 18h-5"/><path d="M18 14h-8"/><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="10" y="6" rx="1"/></svg></p>
        <p className="text-sm font-medium text-slate-500">Articles</p>
      </div>

      <div className="absolute -right-10 top-8 rounded-3xl border border-white/40 bg-white/80 px-6 py-5 backdrop-blur-xl shadow-2xl shadow-slate-200/70 transition-all duration-300 hover:-translate-y-2 hover:shadow-emerald-300/40">
        <p className="text-3xl font-extrabold text-emerald-600"><svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#018e11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-check-icon lucide-user-round-check"><path d="M2 21a8 8 0 0 1 13.292-6"/><circle cx="10" cy="8" r="5"/><path d="m16 19 2 2 4-4"/></svg></p>
        <p className="text-sm font-medium text-slate-500">Readers</p>
      </div>

      <div className="absolute top-90 -left-7 rounded-3xl border border-white/40 bg-white/80 px-6 py-5 backdrop-blur-xl shadow-2xl shadow-slate-200/70 transition-all duration-300 hover:-translate-y-2 hover:shadow-emerald-300/40">
        <p className="text-3xl font-extrabold text-emerald-600"><svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#018e11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg></p>
        <p className="text-sm font-medium text-slate-500">Writers</p>
      </div>

      <div className="relative flex justify-center items-center">
  <img
    src="/hero.svg"
    alt="OpenPage Illustration"
    className="w-full max-w-xl transition-all duration-700 hover:scale-105 drop-shadow-[0_40px_60px_rgba(16,185,129,0.35)]"
  />
</div>

    </div>

  </div>

</main>

      <footer className="border-t border-slate-200 bg-white/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-6 gap-y-2 px-6 py-6 text-sm text-slate-500">
          {FOOTER_LINKS.map((label) => (
            <span key={label} className="cursor-default hover:text-emerald-600 transition-colors duration-300">
              {label}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
