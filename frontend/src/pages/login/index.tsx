import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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
    <div className="h-full grid grid-cols-1 md:grid-cols-2 bg-background transition-colors">
      {/* Left Side - Visual Branding */}
      <div className="hidden md:flex flex-col justify-center items-center bg-foreground text-background p-24 relative overflow-hidden">
        <div className="z-10 text-center">
          <div className="w-24 h-24 border-4 border-background flex items-center justify-center mb-8 mx-auto rotate-3 hover:rotate-12 transition-transform">
            <div className="w-12 h-12 bg-background rounded-full" />
          </div>
          <h1 className="text-7xl font-black uppercase tracking-tighter mb-4 leading-none text-background">
            System.
            <br />
            Access.
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

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-12 bg-background border-l border-foreground/10">
        <div className="w-full max-w-sm">
          <div className="mb-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">
              Login.
            </h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              ENTER YOUR CREDENTIALS TO INITIALIZE SESSION
            </p>
          </div>

          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit, onInvalid)}
          >
            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="USER@SYSTEM.COM"
                  className={`w-full bg-background border border-foreground px-4 py-4 text-xs font-bold  tracking-widest focus:outline-none focus:bg-muted transition-all rounded-sm ${errors.email ? "border-destructive" : ""}`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email",
                    },
                  })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Access Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full bg-background border border-foreground px-4 py-4 text-xs font-bold  tracking-widest focus:outline-none focus:bg-muted transition-all rounded-sm ${errors.password ? "border-destructive" : ""}`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
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

            {/* Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-foreground text-background py-5 font-black uppercase text-xs tracking-[0.2em] hover:invert transition-all active:scale-[0.98] disabled:opacity-50 rounded-sm"
            >
              {isPending ? "INITIALIZING..." : "LOG INTO SYSTEM →"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-foreground/10 text-center">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              NEW TO THE SYSTEM?{" "}
              <Link to="/signup">
                <span className="text-foreground cursor-pointer hover:underline underline-offset-4 decoration-2">
                  REGISTER HERE
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
