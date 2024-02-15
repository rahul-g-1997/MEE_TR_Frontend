export const checkLogin = () => {
  var token = localStorage.getItem("token");
  return token !== null;
};
