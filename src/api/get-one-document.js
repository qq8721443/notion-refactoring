import { request } from "./index.js";

export const getOneDocument = async (id) => {
  const document = await request(`/documents/${id}`);
  return document;
};
