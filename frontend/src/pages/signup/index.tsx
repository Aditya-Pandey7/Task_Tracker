import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignup } from "@/hooks/query_hook";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SignupProps {
  username: string;
  email: string;
  password: string;
}

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupProps>();
  const { mutate, isPending } = useSignup();

  const onSubmit = (data: SignupProps) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        navigate("/verify-otp/" + data.email);
      },
    });
  };

  const onInvalid = (errors: FieldErrors<SignupProps>) => {
    const firstError = Object.values(errors)[0];
    if (firstError?.message) {
      toast.error(firstError.message as string);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 transition-colors px-6">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-900 shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-gray-200 dark:border-gray-800">
        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center items-center bg-indigo-600 dark:bg-indigo-700 text-white p-12">
          <h2 className="text-4xl font-bold mb-4">Join Us Today 🚀</h2>
          <p className="text-indigo-100 text-lg text-center max-w-sm">
            Create your account and start exploring powerful features built just
            for you.
          </p>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Create your account
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Fill in the details below to get started
            </p>

            <form
              className="space-y-6"
              onSubmit={handleSubmit(onSubmit, onInvalid)}
            >
              {/* Username */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </label>
                <Input
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Username must be at most 20 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message:
                        "Username can only contain letters, numbers, and underscores",
                    },
                  })}
                  type="text"
                  placeholder="Enter your username"
                  className={`h-12 rounded-xl bg-white dark:bg-gray-800 ${errors.username ? "border-red-500" : "border-gray-300 dark:border-gray-700"} text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-600`}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <Input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="Enter your email"
                  className={`h-12 rounded-xl bg-white dark:bg-gray-800 ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-700"} text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-600`}
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>

                <Input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                      message:
                        "Password must contain uppercase, lowercase, and a number",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`h-12 rounded-xl pr-12 bg-white dark:bg-gray-800 ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
                  } text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-600`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[38px] text-gray-500 dark:text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <input
                  type="checkbox"
                  required
                  className="mt-1 accent-indigo-600"
                />
                <p>
                  I agree to the{" "}
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer hover:underline">
                    Terms & Conditions
                  </span>
                </p>
              </div>

              {/* Button */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 text-lg rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 transition"
              >
                {isPending ? "Creating account..." : "Create Account"}
              </Button>

              {/* Footer */}
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer hover:underline"
                >
                  Login here
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
