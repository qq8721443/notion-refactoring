import { API_END_POINT } from "../constants/index.js";

export const request = async (url, options) => {
  const res = await fetch(`${API_END_POINT}${url}`, {
    ...options,
    headers: {
      "x-username": "jeongkihong",
      "Content-type": "application/json",
    },
  });
  return await res.json();
};

export * from "./get-documents.js";
export * from "./get-one-document.js";
export * from "./set-new-document.js";
export * from "./modify-document.js";
export * from "./remove-document.js";
