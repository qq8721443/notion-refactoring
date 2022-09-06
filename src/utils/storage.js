const storage = window.localStorage;

export const getStorage = (key, initialValue) => {
  try {
    const data = storage.getItem(key);

    if (!data) return initialValue;

    return JSON.parse(data);
  } catch {
    return initialValue;
  }
};

export const setStorage = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};
