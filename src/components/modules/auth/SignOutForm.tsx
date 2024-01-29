import lightImg from 'assets/img/spot-illustrations/1.png';
import darkImg from 'assets/img/spot-illustrations/dark_1.png';
import { Link } from 'react-router-dom';
import Button from 'components/base/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const SignOutForm = ({ layout }: { layout: 'simple' | 'card' | 'split' }) => {
  console.log(layout);
  return (
    <div className="text-center mb-6 mx-auto">
      <img className="mb-7 d-dark-none" src={lightImg} alt="phoenix" />
      <img className="mb-7 d-light-none" src={darkImg} alt="phoenix" />
      <div className="mb-6">
        <h4 className="text-1000">Come back soon!</h4>
        <p className="text-700">
          Thanks for using Phoenix. <br className="d-lg-none" />
          You are now successfully signed out.
        </p>
      </div>
      <div className="d-grid">
        <Button
          variant="primary"
          as={Link}
          to={`/auth/sign-in`}
          startIcon={<FontAwesomeIcon icon={faAngleLeft} className="me-2" />}
        >
          Go to sign in page
        </Button>
      </div>
    </div>
  );
};

export default SignOutForm;
