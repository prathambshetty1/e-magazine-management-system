import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { FaEnvelope, FaKey, FaLock } from "react-icons/fa";
import EmailStep from "@/components/auth/EmailStep";
import OtpStep from "@/components/auth/OtpStep";
import ResetPasswordStep from "@/components/auth/ResetPasswordStep";
function ForgotPassword() {
  const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <Card className="w-full max-w-xl rounded-3xl shadow-2xl">

        <CardContent className="p-10">

          <h1 className="text-3xl font-bold text-center">
            Forgot Password
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Reset your NMAMIT E-Magazine account password.
          </p>

          {/* Step Indicator */}

          <div className="flex items-center justify-between mt-10 mb-12">

            <div className="flex flex-col items-center flex-1">

              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  step >= 1
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                <FaEnvelope />
              </div>

              <p className="mt-2 text-sm">
                Email
              </p>

            </div>

            <div className="h-1 flex-1 bg-gray-300 mx-2" />

            <div className="flex flex-col items-center flex-1">

              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  step >= 2
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                <FaKey />
              </div>

              <p className="mt-2 text-sm">
                Verify OTP
              </p>

            </div>

            <div className="h-1 flex-1 bg-gray-300 mx-2" />

            <div className="flex flex-col items-center flex-1">

              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  step >= 3
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                <FaLock />
              </div>

              <p className="mt-2 text-sm">
                Reset
              </p>

            </div>

          </div>

          {/* Temporary Step Content */}

          <div className="text-center">

            {step === 1 && (
  <EmailStep
    email={email}
    setEmail={setEmail}
    onSuccess={() => setStep(2)}
  />
)}

            {step === 2 && (
  <OtpStep
    email={email}
    onSuccess={() => setStep(3)}
  />
)}

            {step === 3 && (
  <ResetPasswordStep
    email={email}
  />
)}

          </div>

        </CardContent>

      </Card>

    </div>
  );
}

export default ForgotPassword;