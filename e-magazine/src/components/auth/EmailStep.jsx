import { useState } from "react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import api from "@/services/api";

function EmailStep({
  email,
  setEmail,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email.trim()) {
      return toast.error("Please enter your email.");
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/auth/forgot-password",
        {
          email,
        }
      );

      toast.success(res.data.message);

      onSuccess();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to send OTP."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="space-y-6">

      <div>

        <label className="font-medium">
          NMAMIT Email
        </label>

        <Input
          className="mt-2"
          placeholder="nnm23cs123@nmamit.in"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

      </div>

      <Button
        className="w-full"
        disabled={loading}
        onClick={handleSendOtp}
      >
        {loading
          ? "Sending OTP..."
          : "Send OTP"}
      </Button>

    </div>
  );
}

export default EmailStep;