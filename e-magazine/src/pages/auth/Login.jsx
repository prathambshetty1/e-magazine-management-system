import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import ImageSlider from "@/components/common/ImageSlider";
import logo from "@/assets/logo/nitte-nmamit-logo.png";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">

      {/* ================= LEFT SIDE ================= */}

      <ImageSlider />

      {/* ================= RIGHT SIDE ================= */}

      <div className="w-1/2 bg-slate-50 flex items-center justify-center p-10">

        <div className="w-full max-w-md">

          {/* College Logo */}

          <div className="flex justify-center mb-8">
            <img
              src={logo}
              alt="NMAMIT Logo"
              className="w-[450px] h-auto"
            />
          </div>

          {/* Portal Title */}

          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-slate-800">
              E-Magazine Portal
            </h1>

            <p className="text-gray-500 mt-2">
              NMAM Institute of Technology
            </p>

          </div>

          {/* Login Card */}

          <Card className="rounded-3xl shadow-2xl border-0">

            <CardHeader className="text-center space-y-2">

              <CardTitle className="text-2xl font-bold">
                Welcome Back 👋
              </CardTitle>

              <CardDescription>
                Sign in to continue
              </CardDescription>

            </CardHeader>

            <CardContent>

              <form className="space-y-6">

                {/* Email */}

                <div className="space-y-2">

                  <Label htmlFor="email">
                    Email
                  </Label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-11"
                  />

                </div>

                {/* Password */}

                <div className="space-y-2">

                  <div className="flex justify-between items-center">

                    <Label htmlFor="password">
                      Password
                    </Label>

                    <button
                      type="button"
                      className="text-sm text-emerald-600 hover:underline"
                    >
                      Forgot Password?
                    </button>

                  </div>

                  <div className="relative">

                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-11 pr-10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-600"
                    >
                      {showPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>

                  </div>

                </div>

                {/* Login Button */}

                <Button
                  type="submit"
                  className="w-full h-11 bg-emerald-600 hover:bg-emerald-700"
                >
                  Sign In
                </Button>

              </form>

            </CardContent>

          </Card>

          {/* Footer */}

          <p className="text-center text-gray-400 text-sm mt-8">
            © 2026 NMAM Institute of Technology
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;