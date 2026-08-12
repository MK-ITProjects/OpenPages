import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../entities/user/model/AuthContext.jsx';

function maskEmail(email = '') {
  const [local, domain] = email.split('@');

  if (!domain) return email;

  return `${local.slice(0, 2)}${'•'.repeat(6)}@${domain}`;
}

export function AvatarMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  const handleSignOut = () => {
    logout();
    close();
    navigate('/');
  };

  return (
    <div className="relative">
      {/* Avatar */}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        title={user?.name}
        aria-label="Account Menu"
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          bg-gradient-to-br
          from-emerald-500
          to-green-700
          text-sm
          font-bold
          text-white
          shadow-md
          ring-2
          ring-white
          transition-all
          duration-300
          hover:scale-105
          hover:shadow-lg
        "
      >
        {user?.name?.[0]?.toUpperCase()}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={close}
          />

          <div
            className="
              absolute
              right-0
              top-full
              z-40
              mt-3
              w-80
              overflow-hidden
              rounded-3xl
              border
              border-emerald-100
              bg-white
              shadow-2xl
            "
          >
            {/* Header */}

            <div
              className="
                flex
                items-center
                gap-4
                bg-gradient-to-r
                from-emerald-50
                to-green-50
                p-6
              "
            >
              <span
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-emerald-500
                  to-green-700
                  text-lg
                  font-bold
                  text-white
                  shadow-md
                "
              >
                {user?.name?.[0]?.toUpperCase()}
              </span>

              <div className="min-w-0">
                <p className="truncate text-lg font-bold text-gray-900">
                  {user?.name}
                </p>

                <p className="truncate text-xs text-gray-500">
                  {maskEmail(user?.email)}
                </p>
              </div>
            </div>

            {/* Menu */}

            <div className="p-3">

              <Link
                to={`/profile/${user.id}`}
                onClick={close}
                className="
                  mb-2
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-gray-700
                  transition-all
                  duration-300
                  hover:bg-emerald-50
                  hover:text-emerald-700
                "
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-icon lucide-circle-user"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>
                <span className="font-medium">
                  View Profile
                </span>
              </Link>

              

            </div>

            <div className="border-t border-emerald-100" />

            {/* Logout */}

            <button
              type="button"
              onClick={handleSignOut}
              className="
                flex
                w-full
                items-center
                gap-3
                px-6
                py-4
                text-left
                transition-all
                duration-300
                hover:bg-red-50
              "
            >
              <span className="text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out-icon lucide-log-out"><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/></svg>
              </span>

              <span className="font-semibold text-red-600">
                Sign Out
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}