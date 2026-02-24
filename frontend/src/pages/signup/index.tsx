import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignup } from "@/hooks/query_hook";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface SignupProps {
  username: string;
  email: string;
  password: string;
}

function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<SignupProps>();
  const { mutate, isPending } = useSignup();

  const onSubmit = (data: SignupProps) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        navigate("/verify-otp/" + data.email);
      },
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center items-center bg-indigo-600 text-white p-12">
          <h2 className="text-4xl font-bold mb-4">Join Us Today 🚀</h2>
          <p className="text-indigo-100 text-lg text-center max-w-sm">
            Create your account and start exploring powerful features built just
            for you.
          </p>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Create your account
            </h1>
            <p className="text-gray-500 mb-8">
              Fill in the details below to get started
            </p>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Username */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Username
                </label>
                <Input
                  {...register("username", { required: true })}
                  type="text"
                  placeholder="Enter your username"
                  className="h-12 rounded-xl focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 rounded-xl focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="••••••••"
                  className="h-12 rounded-xl focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <input
                  type="checkbox"
                  required
                  className="mt-1 accent-indigo-600"
                />
                <p>
                  I agree to the{" "}
                  <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
                    Terms & Conditions
                  </span>
                </p>
              </div>

              {/* Button */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 text-lg rounded-xl bg-indigo-600 hover:bg-indigo-700 transition"
              >
                {isPending ? "Creating account..." : "Create Account"}
              </Button>

              {/* Footer */}
              <p className="text-sm text-gray-500 text-center mt-6">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-indigo-600 font-medium cursor-pointer hover:underline"
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
