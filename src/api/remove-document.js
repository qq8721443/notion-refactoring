import { request } from "./index.js";

export const removeDocument = async (id) => {
  const res = await request(`/documents/${id}`, {
    method: "DELETE",
  });
  return res;
};
