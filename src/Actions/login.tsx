// Define interface for session data
import UpdateProfile from './UpdateProfile';
interface SessionData {
  isLoggedIn: boolean;
  sessionToken: string;
  email: string;
  created_at: string;
  updated_at: string;
  expire_on: string;
}

// Function to update session in localStorage
const updateSession = (
  sessionToken: string,
  email: string,
  expire_on: string
) => {
  const date = new Date();
  const session: SessionData = {
    sessionToken: sessionToken,
    isLoggedIn: true,
    email: email,
    created_at: date.toISOString(),
    updated_at: date.toISOString(),
    expire_on: expire_on
  };

  // Save session to localStorage
  localStorage.setItem('session', JSON.stringify(session));
};

const onSuccessLogin = (loginResponse: string, email: string) => {
  const sessionToken = loginResponse.split('=')[1].split(';')[0];
  const expireOn = loginResponse.split(';')[3].split('=')[1];

  if (!sessionToken) {
    return false;
  }
  updateSession(sessionToken, email, expireOn);
  UpdateProfile();
  return true;
};

export default onSuccessLogin;
