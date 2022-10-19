export const getStorageObject = (key: string) => {
  const item: string | null = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }
  return undefined;
};

export const setStorageObject = (key: string, object: any) => {
  localStorage.setItem(key, JSON.stringify(object));
};

export const deleteStorageObject = (key: string) => {
  localStorage.removeItem(key);
};

export const getSessionStorageObject = (key: string) => {
  const item: string | null = sessionStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }
  return undefined;
};

export const setSessionStorageObject = (key: string, object: any) => {
  sessionStorage.setItem(key, JSON.stringify(object));
};
