import api from "./api";

// ===============================
// Create Submission
// ===============================
export const createSubmission = async (formData) => {
  const response = await api.post("/submissions", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ===============================
// Dashboard Statistics
// ===============================
export const getDashboardStats = async () => {
  const response = await api.get("/submissions/dashboard");
  return response.data;
};

// ===============================
// My Submissions
// ===============================
export const getMySubmissions = async () => {
  const response = await api.get("/submissions/my");
  return response.data;
};

// ===============================
// Get Single Submission
// ===============================
export const getSubmissionById = async (id) => {
  const response = await api.get(`/submissions/${id}`);
  return response.data;
};

// ===============================
// Update Submission
// ===============================
export const updateSubmission = async (id, formData) => {
  const response = await api.put(`/submissions/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};