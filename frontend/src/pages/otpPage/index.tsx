import { useVerifyOtp } from "@/hooks/query_hook";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const OtpPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const { mutate, isPending } = useVerifyOtp();
  const { email } = useParams();

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const finalOtp = otp.join("");

    mutate(
      { email: email!, otp: finalOtp },
      {
        onSuccess: () => {
          navigate("/");
        },
      },
    );
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 transition-colors px-4">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl rounded-2xl p-10 w-full max-w-md text-center transition-colors">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Verify OTP
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-3 mb-8">
          Enter the 6-digit code sent to your email
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              disabled={isPending}
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="
                w-12 h-14 text-center text-xl font-semibold
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-gray-100
                border border-gray-300 dark:border-gray-700
                rounded-lg
                focus:ring-2 focus:ring-indigo-600
                outline-none transition
                disabled:bg-gray-200 dark:disabled:bg-gray-700
                disabled:cursor-not-allowed
              "
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          disabled={isPending}
          onClick={handleSubmit}
          className="
            w-full
            bg-indigo-600 hover:bg-indigo-700
            dark:bg-indigo-600 dark:hover:bg-indigo-500
            text-white
            py-3 rounded-xl
            font-semibold
            transition duration-300
            disabled:bg-gray-400 dark:disabled:bg-gray-600
            disabled:cursor-not-allowed
          "
        >
          {isPending ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Resend */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
          Didn’t receive code?{" "}
          <span className="text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer hover:underline">
            Resend OTP
          </span>
        </p>

        {/* Back */}
        <button
          onClick={() => navigate("/signup")}
          className="mt-6 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition"
        >
          ← Back to Signup
        </button>
      </div>
    </section>
  );
};

export default OtpPage;
