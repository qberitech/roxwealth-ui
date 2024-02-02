const validateSession = () => {
  const appData = JSON.parse(localStorage.getItem('appData'));
  const session = appData.session;
  if (!session) {
    return false;
  }
  const updated_at = new Date(session.updated_at);
  const created_at = new Date(session.created_at);
  const now = new Date();
  const diff_1 = now.getTime() - updated_at.getTime();
  const diff_2 = now.getTime() - created_at.getTime();
  const diff_1_in_minutes = Math.round(diff_1 / 60000);
  const diff_2_in_minutes = Math.round(diff_2 / 60000);
  if (diff_1_in_minutes > 30 || diff_2_in_minutes > 60) {
    return false;
  }
  // change session updated_at
  session.updated_at = now;
  appData.session = session;
  localStorage.setItem('appData', JSON.stringify(appData));
  return true;
};
export default validateSession;