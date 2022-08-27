import { request } from "./index.js";

export const getDocuments = async () => {
  const documents = await request("/documents");
  return documents;
};
