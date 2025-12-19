import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { toast } from "sonner";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const navigate = useNavigate();

  // 📩 SEND OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setResendLoading(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.AUTH.FORGOT_PASSWORD,
        { email }
      );

      toast.success("OTP sent to your email");

      // ⏳ START TIMER (10 mins)
      setTimeLeft(response.data.expiresIn || 600);
      setStep("otp");
    } catch (error) {
      toast.warning(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setResendLoading(false);
    }
  };

  // 🔐 VERIFY OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post(API_PATHS.AUTH.VERIFY_RESET_OTP, { email, otp });

      toast.success("OTP verified");

      navigate("/reset-password", {
        state: { email, otp },
      });
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Invalid OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  // ⏰ FORMAT TIME
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // ⏲️ TIMER EFFECT
  useEffect(() => {
    if (step !== "otp" || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [step, timeLeft]);

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <Card className="border-none shadow-none">
          <CardHeader className="p-0 mb-10">
            <CardTitle className="text-4xl font-bold">
              {step === "email" ? "Forgot Password?" : "Verify OTP"}
            </CardTitle>
            <CardDescription className="mt-3">
              {step === "email"
                ? "We’ll send an OTP to your email"
                : `OTP sent to ${email}`}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 max-w-md">
            {/* EMAIL */}
            {step === "email" && (
              <form className="space-y-6" onSubmit={handleSendOtp}>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  size="lg"
                  disabled={resendLoading}
                >
                  {resendLoading ? (
                    <>
                      <Spinner />
                      SENDING...
                    </>
                  ) : (
                    "SEND OTP"
                  )}
                </Button>
              </form>
            )}

            {/* OTP */}
            {step === "otp" && (
              <form className="space-y-6" onSubmit={handleVerifyOtp}>
                <div className="space-y-2">
                  <Label>Enter OTP</Label>
                  <Input
                    type="text"
                    maxLength="6"
                    placeholder="6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  size="lg"
                  disabled={loading || timeLeft <= 0}
                >
                  {loading ? (
                    <>
                      <Spinner />
                      VERIFYING...
                    </>
                  ) : (
                    "VERIFY OTP"
                  )}
                </Button>
                {timeLeft <= 0 && (
                  <Button
                    variant="outline"
                    className="w-full mt-0 cursor-pointer"
                    onClick={handleSendOtp}
                    disabled={resendLoading}
                  >
                    {resendLoading ? (
                      <>
                        <Spinner />
                        RESENDING...
                      </>
                    ) : (
                      "RESEND OTP"
                    )}
                  </Button>
                )}
                {timeLeft > 0 ? (
                  <p className="text-sm text-muted-foreground text-center">
                    OTP expires in:{" "}
                    <span className="font-semibold text-primary">
                      {formatTime(timeLeft)}
                      <span className="text-muted-foreground"> minutes</span>
                    </span>
                  </p>
                ) : (
                  <p className="text-sm text-red-500 text-center">
                    OTP expired. Please resend OTP.
                  </p>
                )}
              </form>
            )}

            <div className="text-center mt-8">
              <Link
                to="/login"
                className="font-semibold text-primary hover:underline inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
