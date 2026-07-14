import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import ImageSlider from "@/components/common/ImageSlider";
import logo from "@/assets/logo/nmamit-logo.png";

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

import { loginUser } from "@/services/authService";
import { ROLES } from "@/config/roles";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser({
        email,
        password,
      });

      console.log("Login Successful");
      console.log(data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      switch (data.user.role) {
        case ROLES.STUDENT:
          navigate("/student/dashboard");
          break;

        case ROLES.DEPT_ADMIN:
          navigate("/dept-admin/dashboard");
          break;

        case ROLES.MAIN_ADMIN:
          navigate("/main-admin/dashboard");
          break;

        default:
          console.error("Unknown role:", data.user.role);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">

      {/* Left Section */}

      <ImageSlider />

      {/* Right Section */}

      <div className="w-1/2 bg-slate-50 flex flex-col items-center justify-center px-10">

        {/* Logo */}

        <img
          src={logo}
          alt="NMAMIT Logo"
          className="w-[420px] h-auto mb-8"
        />

        {/* Login Card */}

        <Card className="w-full max-w-md rounded-3xl shadow-2xl">

          <CardHeader className="text-center">

            <CardTitle className="text-4xl font-bold">
              Welcome Back
            </CardTitle>

            <CardDescription className="text-base">
              Sign in to access the E-Magazine Portal
            </CardDescription>

          </CardHeader>

          <CardContent>

            <form onSubmit={handleLogin} className="space-y-6">

              {/* Email */}

              <div className="space-y-2">

                <Label htmlFor="email">
                  Email
                </Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                    required
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
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>

            </form>

          </CardContent>

        </Card>

        {/* Footer */}

        <p className="mt-8 text-sm text-gray-500">
          © 2026 NMAM Institute of Technology
        </p>

      </div>

    </div>
  );
}

export default Login;