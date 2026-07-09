import api from "./api";

// Get all submission windows
export const getSubmissionWindows = async () => {
  const response = await api.get("/windows");
  return response.data;
};

// Update submission window
export const updateSubmissionWindow = async (
  category,
  data
) => {
  const response = await api.put(
    `/windows/${category}`,
    data
  );

  return response.data;
};