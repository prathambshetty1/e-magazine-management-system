import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import api from "@/services/api";

function ResetPasswordStep({ email }) {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!password.trim()) {
      return toast.error("Enter a new password.");
    }

    if (password.length < 6) {
      return toast.error(
        "Password must be at least 6 characters."
      );
    }

    if (password !== confirmPassword) {
      return toast.error(
        "Passwords do not match."
      );
    }

    try {

      setLoading(true);

      const res = await api.post(
        "/auth/reset-password",
        {
          email,
          password,
        }
      );

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to reset password."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="space-y-6">

      <div>

        <label className="font-medium">
          New Password
        </label>

        <Input
          type="password"
          className="mt-2"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          placeholder="Enter new password"
        />

      </div>

      <div>

        <label className="font-medium">
          Confirm Password
        </label>

        <Input
          type="password"
          className="mt-2"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          placeholder="Confirm password"
        />

      </div>

      <Button
        className="w-full"
        disabled={loading}
        onClick={handleResetPassword}
      >
        {loading
          ? "Updating Password..."
          : "Reset Password"}
      </Button>

    </div>
  );
}

export default ResetPasswordStep;