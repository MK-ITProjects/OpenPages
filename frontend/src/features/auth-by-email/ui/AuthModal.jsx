import { useNavigate } from 'react-router-dom';
import { useAuthModal } from '../../../app/providers/AuthModalContext.jsx';
import { LoginForm } from './LoginForm.jsx';
import { RegisterForm } from './RegisterForm.jsx';

export function AuthModal() {
  const { isOpen, mode, redirectTo, close, switchMode } = useAuthModal();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSuccess = () => {
    close();
    navigate(redirectTo);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/30 px-4 py-10 sm:items-center">
      <div className="relative w-full max-w-sm rounded-lg bg-white p-8 shadow-xl">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 text-ink-faint hover:text-ink"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <h2 className="mb-6 text-center font-serif text-2xl font-bold text-ink">
          {mode === 'login' ? 'Welcome back.' : 'Join OpenPage'}
        </h2>

        {mode === 'login' ? (
          <LoginForm onSuccess={handleSuccess} />
        ) : (
          <RegisterForm onSuccess={handleSuccess} />
        )}

        <p className="mt-6 text-center text-sm text-ink-light">
          {mode === 'login' ? (
            <>
              No account?{' '}
              <button type="button" onClick={() => switchMode('register')} className="text-green-700 hover:underline">
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button type="button" onClick={() => switchMode('login')} className="text-green-700 hover:underline">
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
