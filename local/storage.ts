// file for storing data on local storage, session storage

export const saveData = (key: string, value: string): boolean => {
  try {
    sessionStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};


export const getData = (key: string): string|null  => {
    try {
    const value : string|null  =  sessionStorage.getItem(key);
      return value;
    } catch (error) {
      return "";
    }
  };
  