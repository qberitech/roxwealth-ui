import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/base/Button';
import Section from 'components/base/Section';
import EcoimDefaultAddressCard from 'components/cards/EcoimDefaultAddressCard';
import EcomProfileCard from 'components/cards/EcomProfileCard';
// import PageBreadcrumb from 'components/common/PageBreadcrumb';
import ProfileDetailsTab from 'components/modules/e-commerce/profile/ProfileDetailsTab';
// import { defaultBreadcrumbItems } from 'data/commonData';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

const Profile = () => {
  const [error, setError] = useState('');

  const [profileDetail, setProfileDetails] = useState({
    email: 'Email Not Found',
    id: 'Not Found',
    mobile: 'XXXXXXXXXX',
    name: 'Not Found',
    profilePicture: 'Not Available'
  });
  useEffect(() => {
    const appData = JSON.parse(localStorage.getItem('appData') || '{}');
    let myData = {
      email: 'Email Not Found',
      id: 'Not Found',
      mobile: 'XXXXXXXXXX',
      name: 'Not Found',
      profilePicture: 'Not Available'
    };
    if (appData && appData.userData) {
      myData.email = appData.userData.email;
      myData.name = appData.userData.name;
      myData.mobile = appData.userData.mobile;
      myData.profilePicture = appData.userData.profilePicture;
      setProfileDetails(myData);
      console.log(myData);
    } else {
      setError('User Not Found');
      myData = {
        email: 'Email Not Found',
        id: 'Not Found',
        mobile: 'XXXXXXXXXX',
        name: 'Not Found',
        profilePicture: 'Not Available'
      };
    }
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="pt-5 mb-9">
      <Section small className="py-0">
        {/* <PageBreadcrumb items={defaultBreadcrumbItems} /> */}
        <Row className="align-items-center justify-content-between g-3 mb-4">
          <Col xs="auto">
            <h2 className="mb-0">Profile</h2>
          </Col>
          <Col xs="auto" className="d-flex flex-wrap gap-2 gap-sm-3">
            {/* <Button
              variant="phoenix-danger"
              startIcon={<FontAwesomeIcon className="me-2" icon={faTrashAlt} />}
            >
              Delete customer
            </Button> */}
            <Button
              variant="phoenix-secondary"
              startIcon={<FontAwesomeIcon className="me-2" icon={faKey} />}
            >
              Reset password
            </Button>
          </Col>
        </Row>
        <Row className="g-3 mb-6">
          <Col xs={12} lg={8}>
            <EcomProfileCard details={profileDetail} />
          </Col>
          <Col xs={12} lg={4}>
            <EcoimDefaultAddressCard details={profileDetail} />
          </Col>
        </Row>
        <ProfileDetailsTab />
      </Section>
    </div>
  );
};

export default Profile;
