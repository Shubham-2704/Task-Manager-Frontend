import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Zap } from "lucide-react";
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

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Card className="border-none shadow-none">
          <CardHeader className="text-left p-0 mb-10">
            {/* <div className="flex items-center gap-2 mb-4">
              <Zap className="w-7 h-7 text-primary" />
              <span className="text-2xl font-bold">TaskFlow</span>
            </div> */}
            <CardTitle className="text-4xl lg:text-5xl font-bold">
              Set New Password
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-3 text-base">
              Your new password must be different from previous ones.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter new password"
                    className="pl-10 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    placeholder="Confirm your new password"
                    className="pl-10 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full" size="lg">
                RESET PASSWORD
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
