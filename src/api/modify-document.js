import { request } from "./index.js";

export const modifyDocument = async (id, title, content) => {
  const res = await request(`/documents/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
    }),
  });
  return res;
};
