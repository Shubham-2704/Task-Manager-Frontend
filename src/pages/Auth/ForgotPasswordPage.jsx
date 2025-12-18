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

const ForgotPasswordPage = () => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    // API CALL → SEND OTP
    setStep("otp");
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // API CALL → VERIFY OTP SUCCESS

    // ✅ Redirect to reset password page
    navigate("/reset-password", {
      state: { email, otp },
    });
  };

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

                <Button type="submit" className="w-full" size="lg">
                  SEND OTP
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
                    placeholder="6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  VERIFY OTP
                </Button>
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
