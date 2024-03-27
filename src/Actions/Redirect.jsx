const redirect = () => {
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');

  const role = profile.roles || {};
  const QberiRoles = role.Qberi || [];
  const HospitalMerchRoles = role.HospitalMerch || [];

  const required = ['ADMIN', 'VERIFIED USERS', 'MODERATOR'];

  if (QberiRoles.some(r => required.includes(r))) {
    return '/dashboard/roxwealth';
  }
  if (HospitalMerchRoles.some(r => required.includes(r))) {
    return '/hospitalmerch/home';
  }

  return '/hold/thankyou';
};

export default redirect;
