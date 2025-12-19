import AuthLayout from "@/components/layouts/AuthLayout";
import React, { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { loginSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { toast } from "sonner";
import { UserContext } from "@/context/UserContext";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { updateUser } = useContext(UserContext);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  async function onSubmit(values) {
    setLoading(true);
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, values);

      const { role, token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        // Redirect to dashboard based on role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }

      toast.success("Login successfully");
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        setLoading(false);
      } else {
        toast.error("Something went wrong");
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="lg:w-[78%] h-3/4 mt-2 md:mt-4 md:h-full flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-black  dark:text-white">
            Welcome Back
          </h3>
          <p className="text-xs text-slate-700 mt-[5px] mb-6 dark:text-gray-300">
            Please enter your details to log in
          </p>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-0"
                  >
                    <FieldLabel>Email Address</FieldLabel>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />

                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="john@example.com"
                        className="pl-10"
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-1"
                  >
                    {/* Label row */}
                    <div className="flex items-center justify-between mb-1">
                      <FieldLabel>Password</FieldLabel>

                      <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    {/* Input wrapper */}
                    <div className="relative">
                      {/* Left lock icon */}
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />

                      {/* Input */}
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10"
                      />

                      {/* Right eye toggle */}
                      <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <Eye className="h-5 w-5 cursor-pointer" />
                        ) : (
                          <EyeOff className="h-5 w-5 cursor-pointer" />
                        )}
                      </button>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  loading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {loading ? (
                  <>
                    <Spinner />
                    Loading...
                  </>
                ) : (
                  "LOGIN"
                )}
              </Button>
              <FieldDescription className="text-center font-medium  dark:text-white">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary underline font-semibold"
                >
                  Sign Up
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </div>
      </motion.div>
    </AuthLayout>
  );
};

export default Login;
