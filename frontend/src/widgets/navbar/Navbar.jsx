import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../entities/user/model/AuthContext.jsx';
import { useAuthModal } from '../../app/providers/AuthModalContext.jsx';
import { AvatarMenu } from './AvatarMenu.jsx';

export function Navbar({ onMenuClick }) {
  const { user } = useAuth();
  const { openLogin, openRegister } = useAuthModal();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();

    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header
      className="
      sticky
      top-0
      z-30
      border-b
      border-emerald-100
      bg-white/80
      backdrop-blur-xl
      shadow-sm
    "
    >
      <div className="flex h-16 w-full items-center px-6">
        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          className="
          rounded-lg
          p-2
          text-gray-600
          transition
          duration-300
          hover:bg-emerald-50
          hover:text-emerald-700
          lg:hidden
        "
          aria-label="Menu"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>

        {/* Logo */}
        <Link
  to="/"
  className="
    w-56
    shrink-0
    font-serif
    text-[42px]
    font-black
    tracking-tight
    text-emerald-700
    transition
    hover:text-emerald-800
  "
>
          OpenPages
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="hidden flex-1 justify-center sm:flex"
        >
          <div
            className="
            flex
            w-full
            max-w-md
            items-center
            gap-3
            rounded-full
            border
            border-emerald-100
            bg-emerald-50/50
            px-4
            py-2.5
            transition
            duration-300
            focus-within:border-emerald-300
            focus-within:bg-white
            focus-within:shadow-md
          "
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-emerald-600"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-3.5-3.5" />
            </svg>

            <input
              type="text"
              placeholder="Search stories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="
              w-full
              bg-transparent
              text-sm
              text-gray-700
              outline-none
              placeholder:text-gray-400
            "
            />
          </div>
        </form>

        {/* Right Side */}
        <nav className="ml-auto flex items-center gap-5">
          {user && (
            <Link
              to="/search"
              className="
              rounded-lg
              p-2
              text-gray-600
              transition
              hover:bg-emerald-50
              hover:text-emerald-700
              sm:hidden
            "
              aria-label="Search"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-3.5-3.5" />
              </svg>
            </Link>
          )}

          {user ? (
            <>
              {/* Write */}
              <Link
                to="/write"
                className="
                hidden
                items-center
                gap-2
                rounded-full
                px-4
                py-2
                font-medium
                text-gray-700
                transition
                duration-300
                hover:bg-emerald-50
                hover:text-emerald-700
                sm:flex
              "
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>

                Write
              </Link>

              <Link
                to="/write"
                className="
                rounded-lg
                p-2
                text-gray-600
                transition
                hover:bg-emerald-50
                hover:text-emerald-700
                sm:hidden
              "
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </Link>

              {/* Admin */}
              {user?.isAdmin && (
                <div
                  className="relative"
                  onMouseEnter={() => setShowAdminMenu(true)}
                  onMouseLeave={() => setShowAdminMenu(false)}
                >
                  <Link
                    to="/admin/dashboard"
                    className="
                    rounded-full
                    bg-emerald-600
                    px-5
                    py-2
                    font-semibold
                    text-white
                    shadow-sm
                    transition
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-emerald-700
                    hover:shadow-md
                  "
                  >
                    Admin
                  </Link>
                </div>
              )}

              <AvatarMenu />
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => openLogin('/read')}
                className="
                rounded-full
                px-4
                py-2
                font-medium
                text-gray-700
                transition
                hover:bg-emerald-50
                hover:text-emerald-700
              "
              >
                Sign in
              </button>

              <button
                type="button"
                onClick={() => openRegister('/read')}
                className="
                rounded-full
                bg-emerald-600
                px-5
                py-2.5
                font-semibold
                text-white
                shadow-sm
                transition
                duration-300
                hover:-translate-y-0.5
                hover:bg-emerald-700
                hover:shadow-lg
              "
              >
                Get Started
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}