import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks/query_hook";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm<LoginFormData>();
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
  return (
    <div className="h-full flex items-center justify-center bg-gray-100 ">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-indigo-600 text-white p-12">
          <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
          <p className="text-indigo-100 text-lg text-center max-w-sm">
            Sign in to manage your dashboard, track activity, and explore all
            features.
          </p>
        </div>

        {/* Right Side Form */}
        <div className="p-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Login to your account
            </h1>
            <p className="text-gray-500 mb-8">
              Enter your email and password below
            </p>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <div className="relative">
                <Mail
                  className="absolute left-4 top-4 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                  {...register("email", { required: true })}
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock
                  className="absolute left-4 top-4 text-gray-400"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="accent-indigo-600" />
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-indigo-600 hover:underline font-medium"
                >
                  Forgot password?
                </a>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold text-lg transition duration-300"
              >
                {isPending ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500 mt-8">
              Don’t have an account?{" "}
              <Link to="/signup">
                <span className="text-indigo-600 cursor-pointer hover:underline font-medium">
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
