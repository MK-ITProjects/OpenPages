import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../entities/user/api/authApi.js";
import { useAuth } from "../../../entities/user/model/AuthContext.jsx";

export function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const { user, token } = await authApi.login({
        email,
        password,
      });

      login(user, token);

      if (onSuccess) {
        onSuccess();
      } else {
        if (user.isAdmin) {
          navigate("/admin/dashboard");
        } else {
          navigate("/read");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Email */}

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Email Address
        </label>

        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16v12H4z" />
            <path d="m4 7 8 6 8-6" />
          </svg>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              w-full
              rounded-2xl
              border
              border-emerald-200
              bg-white
              py-3.5
              pl-12
              pr-4
              text-gray-700
              outline-none
              transition-all
              duration-300
              placeholder:text-gray-400
              focus:border-emerald-500
              focus:ring-4
              focus:ring-emerald-100
            "
          />
        </div>
      </div>

      {/* Password */}

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Password
        </label>

        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <rect
              x="5"
              y="11"
              width="14"
              height="10"
              rx="2"
            />
            <path d="M8 11V8a4 4 0 1 1 8 0v3" />
          </svg>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              w-full
              rounded-2xl
              border
              border-emerald-200
              bg-white
              py-3.5
              pl-12
              pr-12
              text-gray-700
              outline-none
              transition-all
              duration-300
              placeholder:text-gray-400
              focus:border-emerald-500
              focus:ring-4
              focus:ring-emerald-100
            "
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-500
              hover:text-emerald-600
              transition
            "
          >
            {showPassword ? (
              "🙈"
            ) : (
              "👁️"
            )}
          </button>
        </div>
      </div>

      {/* Error */}

      {error && (
        <div
          className="
            rounded-2xl
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-600
          "
        >
          {error}
        </div>
      )}

      {/* Button */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full
          rounded-2xl
          bg-gradient-to-r
          from-emerald-600
          to-green-700
          py-3.5
          text-base
          font-semibold
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}