import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { ROLES } from "@/config/roles";

import { getPendingSubmissions } from "@/services/adminService";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import ReviewDialog from "@/components/department-admin/ReviewDialog";

function ReviewSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedSubmission, setSelectedSubmission] =
    useState(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const data =
        await getPendingSubmissions();

      setSubmissions(data);

    } catch (err) {
      console.error(err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role={ROLES.DEPT_ADMIN}>

      <div className="space-y-6">

        <div>

          <h1 className="text-4xl font-bold">
            Review Submissions
          </h1>

          <p className="text-gray-500">
            Review pending submissions assigned to you.
          </p>

        </div>

        {loading ? (

          <Card>

            <CardContent className="p-10 text-center">
              Loading...
            </CardContent>

          </Card>

        ) : submissions.length === 0 ? (

          <Card>

            <CardContent className="p-10 text-center text-gray-500">
              No pending submissions.
            </CardContent>

          </Card>

        ) : (

          <div className="space-y-5">

            {submissions.map((submission) => (

              <Card
                key={submission._id}
                className="rounded-2xl hover:shadow-lg transition-all"
              >

                <CardContent className="p-6 flex items-center justify-between">

                  <div className="flex gap-5 items-center">

                    {(submission.category ===
                      "Photography" ||
                      submission.category ===
                        "Paintings") &&
                      submission.image && (

                        <img
                          src={submission.image}
                          alt={submission.title}
                          className="w-28 h-28 rounded-xl object-cover border"
                        />

                      )}

                    <div>

                      <h2 className="text-2xl font-bold">
                        {submission.title}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        {submission.category}
                      </p>

                      <p className="text-sm text-gray-500 mt-3">
                        <span className="font-semibold">
                          Student:
                        </span>{" "}
                        {submission.student.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">
                          Submitted:
                        </span>{" "}
                        {new Date(
                          submission.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </div>

                  </div>

                  <div className="flex flex-col items-end gap-4">

                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                      Pending
                    </span>

                    <Button
                      onClick={() => {
                        setSelectedSubmission(
                          submission
                        );
                        setOpen(true);
                      }}
                    >
                      Review
                    </Button>

                  </div>

                </CardContent>

              </Card>

            ))}

          </div>

        )}

      </div>

      <ReviewDialog
        open={open}
        onOpenChange={setOpen}
        submission={selectedSubmission}
        onApproved={loadSubmissions}
      />

    </DashboardLayout>
  );
}

export default ReviewSubmissions;