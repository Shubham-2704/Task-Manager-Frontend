import AuthLayout from "@/components/layouts/AuthLayout";
import React, { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { signupSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ProfilePhotoSelector from "@/components/Inputs/ProfilePhotoSelector";
import { toast } from "sonner";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { UserContext } from "@/context/UserContext";
import uploadImage from "@/utils/uploadImage";
import { Spinner } from "@/components/ui/spinner";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { updateUser } = useContext(UserContext);

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      adminInviteToken: "",
    },
  });

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  async function onSubmit(values) {
    setLoading(true);

    let profileImageUrl = "";

    try {
      // Upload image if present
      if (profilePic) {
        // console.log("profilePic", profilePic);

        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        ...values,
        profileImageUrl,
      });

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

      toast.success("Account created successfully");
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
      <div className="lg:w-[100%] h-auto md:h-full mt-2 md:mt-4 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black  dark:text-white">
          Create an account
        </h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6 dark:text-gray-300">
          Join us today by entering your details below.
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Full Name</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Email Address</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="john@example.com"
                    />
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
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Password</FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2">
                        {showPassword ? (
                          <Eye
                            className="h-5 w-5 text-primary cursor-pointer"
                            onClick={toggleShowPassword}
                          />
                        ) : (
                          <EyeOff
                            className="h-5 w-5 text-primary cursor-pointer"
                            onClick={toggleShowPassword}
                          />
                        )}
                      </span>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="adminInviteToken"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Admin Invite Token</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="6 Digit Code"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            {/* <Button type="submit" className="w-full cursor-pointer my-4">
              Sign Up
            </Button> */}

            <Button
              type="submit"
              disabled={loading}
              className={`w-full my-4 ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? (
                <>
                  <Spinner />
                  Loading...
                </>
              ) : (
                "SIGN UP"
              )}
            </Button>

            <FieldDescription className="text-center font-medium  dark:text-white">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary underline font-semibold"
              >
                Log In
              </Link>
            </FieldDescription>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
