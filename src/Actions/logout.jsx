const Logout = () => {
  const appData = localStorage.getItem('appData');
  if (!appData) {
    return true;
  }
  const data = JSON.parse(appData);

  if (data.session) {
    data.session = {
      sessionToken: null,
      isLogged: false
    };
  }
  if (data.userData) {
    data.userData = {};
  }

  localStorage.setItem('appData', JSON.stringify(data));
  return true;
};

export default Logout;
