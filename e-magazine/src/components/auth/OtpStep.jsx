import { useState } from "react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import api from "@/services/api";

function OtpStep({
  email,
  onSuccess,
}) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      return toast.error("Enter a valid 6-digit OTP.");
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      toast.success(res.data.message);

      onSuccess();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "OTP verification failed."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="space-y-6">

      <div>

        <label className="font-medium">
          Enter OTP
        </label>

        <Input
          className="mt-2 text-center text-2xl tracking-[0.6em]"
          maxLength={6}
          value={otp}
          onChange={(e) =>
            setOtp(
              e.target.value.replace(/\D/g, "")
            )
          }
          placeholder="000000"
        />

      </div>

      <Button
        className="w-full"
        disabled={loading}
        onClick={handleVerify}
      >
        {loading
          ? "Verifying..."
          : "Verify OTP"}
      </Button>

    </div>
  );
}

export default OtpStep;