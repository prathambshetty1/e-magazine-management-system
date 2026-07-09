import api from "./api";

// Dashboard statistics
export const getDashboardStats = async () => {
  const response = await api.get("/main-admin/dashboard");
  return response.data;
};

// Users
export const getUsers = async () => {
  const response = await api.get("/main-admin/users");
  return response.data;
};

// Assign Department Admin
export const assignDepartmentAdmin = async (data) => {
  const response = await api.put(
    "/main-admin/assign-admin",
    data
  );

  return response.data;
};

// Remove Department Admin
export const removeDepartmentAdmin = async (data) => {
  const response = await api.put(
    "/main-admin/remove-admin",
    data
  );

  return response.data;
};

// All submissions
export const getAllSubmissions = async () => {
  const response = await api.get(
    "/main-admin/submissions"
  );

  return response.data;
};

// Publish one submission
export const publishSubmission = async (id) => {
  const response = await api.put(
    `/main-admin/publish/${id}`
  );

  return response.data;
};