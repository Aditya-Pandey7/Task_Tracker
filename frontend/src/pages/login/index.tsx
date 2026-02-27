import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useForm, type FieldErrors } from "react-hook-form";
import { useLogin } from "@/hooks/query_hook";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormData) => {
    mutate(data, {
      onSuccess: (response) => {
        navigate("/");
        toast.success(response.message);
      },
    });
  };

  const onInvalid = (errors: FieldErrors<LoginFormData>) => {
    const firstError = Object.values(errors)[0];
    if (firstError?.message) {
      toast.error(firstError.message as string);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-gray-100 dark:bg-gray-950 transition-colors">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-900 shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-gray-200 dark:border-gray-800">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-indigo-600 dark:bg-indigo-700 text-white p-12">
          <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
          <p className="text-indigo-100 text-lg text-center max-w-sm">
            Sign in to manage your dashboard, track activity, and explore all
            features.
          </p>
        </div>

        {/* Right Side Form */}
        <div className="p-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Login to your account
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Enter your email and password below
            </p>

            <form
              className="space-y-6"
              onSubmit={handleSubmit(onSubmit, onInvalid)}
            >
              {/* Email */}
              <div className="relative">
                <Mail
                  className="absolute left-4 top-4 text-gray-400 dark:text-gray-500"
                  size={20}
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className={`
                    w-full pl-12 pr-4 py-4
                    border ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-700"}
                    bg-white dark:bg-gray-800
                    text-gray-900 dark:text-gray-100
                    rounded-xl
                    focus:ring-2 focus:ring-indigo-600
                    focus:border-indigo-600
                    outline-none transition
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                  `}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <Lock
                  className="absolute left-4 top-4 text-gray-400 dark:text-gray-500"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`
                    w-full pl-12 pr-12 py-4
                    border ${errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-700"}
                    bg-white dark:bg-gray-800
                    text-gray-900 dark:text-gray-100
                    rounded-xl
                    focus:ring-2 focus:ring-indigo-600
                    focus:border-indigo-600
                    outline-none transition
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                  `}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 dark:text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <input type="checkbox" className="accent-indigo-600" />
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  Forgot password?
                </a>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="
                  w-full
                  bg-indigo-600 hover:bg-indigo-700
                  dark:bg-indigo-600 dark:hover:bg-indigo-500
                  text-white
                  py-4 rounded-xl
                  font-semibold text-lg
                  transition duration-300
                "
              >
                {isPending ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
              Don’t have an account?{" "}
              <Link to="/signup">
                <span className="text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline font-medium">
                  Sign Up
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
