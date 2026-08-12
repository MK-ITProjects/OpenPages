import { Link } from 'react-router-dom';
import { RegisterForm } from '../../features/auth-by-email/ui/RegisterForm.jsx';

export function RegisterPage() {
  return (
    <main
      className="
      flex
      min-h-screen
      items-center
      justify-center
      bg-gradient-to-br
      from-[#f4fbf7]
      via-[#fcfdfc]
      to-[#eef8f2]
      px-4
      py-12
    "
    >
      <div
        className="
        w-full
        max-w-md
        rounded-3xl
        border
        border-emerald-100
        bg-white/90
        p-10
        shadow-2xl
        backdrop-blur-xl
      "
      >
        <div className="mb-8 text-center">
          <div
            className="
            mx-auto
            mb-5
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-emerald-500
            to-green-700
            text-2xl
            font-bold
            text-white
            shadow-lg
          "
          >
            O
          </div>

          <h1
            className="
            font-serif
            text-4xl
            font-bold
            text-gray-900
          "
          >
            Join OpenPages
          </h1>

          <p className="mt-3 text-gray-500">
            Create your account and start sharing your ideas.
          </p>
        </div>

        <RegisterForm />

        <div className="mt-8 border-t border-emerald-100 pt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?
          </p>

          <Link
            to="/login"
            className="
            mt-2
            inline-block
            font-semibold
            text-emerald-700
            transition
            hover:text-emerald-800
            hover:underline
          "
          >
            Sign In →
          </Link>
        </div>
      </div>
    </main>
  );
}