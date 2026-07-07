import api from "./api";

// Create Submission
export const createSubmission = async (data) => {
  const response = await api.post("/submissions", data);
  return response.data;
};

// Dashboard Stats
export const getDashboardStats = async () => {
  const response = await api.get("/submissions/dashboard");
  return response.data;
};

// Get My Submissions
export const getMySubmissions = async () => {
  const response = await api.get("/submissions/my");
  return response.data;
};

// Update Submission
export const updateSubmission = async (id, data) => {
  const response = await api.put(`/submissions/${id}`, data);
  return response.data;
};