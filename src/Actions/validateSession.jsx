const validateSession = () => {
  const appData = JSON.parse(localStorage.getItem('appData'));
  if (!appData) {
    return false;
  }
  console.log('appData', appData);
  const session = appData.session;
  if (!session) {
    console.log('no session');
    return false;
  }
  if (!session.isLoggedIn) {
    console.log('not logged');
    return false;
  }
  return true;
};
export default validateSession;
