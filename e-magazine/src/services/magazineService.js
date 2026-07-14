import api from "./api";

// Get approved submissions
export const getApprovedSubmissions = async () => {
  const response = await api.get(
    "/main-admin/approved-submissions"
  );

  return response.data;
};

// Publish magazine
export const createMagazine = async (
  data
) => {
  const response = await api.post(
    "/magazines",
    data
  );

  return response.data;
};

// Get all magazines
export const getMagazines = async () => {
  const response = await api.get(
    "/magazines"
  );

  return response.data;
};
export const deleteMagazine = async (id) => {
  const response = await api.delete(
    `/magazines/${id}`
  );

  return response.data;
};
export const getMagazineById = async (
  id
) => {
  const response = await api.get(
    `/magazines/${id}`
  );

  return response.data;
};