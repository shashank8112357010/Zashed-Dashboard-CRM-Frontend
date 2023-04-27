// jwt token getter setter
export const getToken = () => {
    return localStorage.getItem('token');
  } 
  // set token to local storage
  export const setToken = (token) => {
    localStorage.setItem('token',token );
  }
  // remove token from local storage
  export const removeToken = () => {
    localStorage.removeItem('token');
  }
  // clear local storage
  export const clearStorage = () => {
    localStorage.clear();
  }