// auth.js
import Cookies from 'js-cookie';

export const isLoggedIn = () => {
  const token = Cookies.get('accessToken'); 
  return token !== undefined;
};
