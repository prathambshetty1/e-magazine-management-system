import api from "./api";

export const getDashboard = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};

export const getPendingSubmissions = async () => {
  const response = await api.get("/admin/submissions");
  return response.data;
};

export const approveSubmission = async (id) => {
  const response = await api.put(`/admin/approve/${id}`);
  return response.data;
};

export const rejectSubmission = async (id, feedback) => {
  const response = await api.put(`/admin/reject/${id}`, {
    feedback,
  });

  return response.data;
};