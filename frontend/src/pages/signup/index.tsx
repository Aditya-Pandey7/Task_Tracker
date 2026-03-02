import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm, type FieldErrors } from "react-hook-form";
import { useSignup } from "@/hooks/query_hook";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

interface SignupFormData {
  username: string;
  email: string;
  password: string;
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormData>();
  const { mutate, isPending } = useSignup();

  const onSubmit = (data: SignupFormData) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        navigate("/verify-otp/" + data.email);
      },
    });
  };

  const onInvalid = (errors: FieldErrors<SignupFormData>) => {
    const firstError = Object.values(errors)[0];
    if (firstError?.message) {
      toast.error(firstError.message as string);
    }
  };

  return (
    <section className="h-screen grid grid-cols-1 md:grid-cols-2 bg-background transition-colors overflow-hidden">
      {/* LEFT SIDE - VISUAL BRANDING */}
      <div className="hidden md:flex flex-col justify-center items-center bg-foreground text-background p-24 relative overflow-hidden">
        <div className="z-10 text-center">
          <div className="w-24 h-24 border-4 border-background flex items-center justify-center mb-8 mx-auto -rotate-3 hover:-rotate-12 transition-transform">
            <div className="w-12 h-12 bg-background" />
          </div>
          <h1 className="text-7xl font-black uppercase tracking-tighter mb-4 leading-none text-background">
            New.
            <br />
            Account.
          </h1>
          <p className="text-xs font-bold uppercase tracking-[0.4em] opacity-60">
            Productivity Management v1.0
          </p>
        </div>
        {/* Decorative Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="flex items-center justify-center p-12 bg-background border-l border-foreground/10 overflow-y-auto">
        <div className="w-full max-w-sm">
          <div className="mb-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">
              Register.
            </h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              CREATE YOUR SYSTEM CREDENTIALS
            </p>
          </div>

          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit, onInvalid)}
          >
            {/* Username */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Identification / Username
              </label>
              <input
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Maximum 20 characters",
                  },
                })}
                type="text"
                placeholder="USER_ID_01"
                className={`w-full bg-background border border-foreground px-4 py-4 text-xs font-bold tracking-widest focus:outline-none focus:bg-muted transition-all rounded-sm ${errors.username ? "border-destructive" : ""}`}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Network Address / Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid address",
                  },
                })}
                type="email"
                placeholder="USER@SYSTEM.COM"
                className={`w-full bg-background border border-foreground px-4 py-4 text-xs font-bold tracking-widest focus:outline-none focus:bg-muted transition-all rounded-sm ${errors.email ? "border-destructive" : ""}`}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Access Password
              </label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full bg-background border border-foreground px-4 py-4 text-xs font-bold tracking-widest focus:outline-none focus:bg-muted transition-all rounded-sm ${errors.password ? "border-destructive" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                required
                className="w-4 h-4 rounded-none border border-foreground accent-foreground cursor-pointer"
              />
              <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
                I accept the{" "}
                <span className="text-foreground underline underline-offset-2 cursor-pointer">
                  System Protocols
                </span>
              </span>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-foreground text-background py-5 font-black uppercase text-xs tracking-[0.2em] hover:invert transition-all active:scale-[0.98] disabled:opacity-50 rounded-sm"
            >
              {isPending ? "PROCESSING..." : "REGISTER INTO SYSTEM →"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-foreground/10 text-center">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              ALREADY REGISTERED?{" "}
              <Link to="/login">
                <span className="text-foreground cursor-pointer hover:underline underline-offset-4 decoration-2">
                  ACCESS SYSTEM
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

