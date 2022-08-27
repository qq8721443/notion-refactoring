import { request } from "./index.js";

export const setNewDocument = async (parentId, title) => {
  const res = await request("/documents", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      parent: parentId,
    }),
  });
  return res;
};
