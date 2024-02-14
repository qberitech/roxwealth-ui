import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
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

  // Email is Hardcoded for now have to make it dynamic later
  const email = 'tony@avengers.com';
  const [profileDetail, setProfileDetails] = useState({
    email: '',
    id: '',
    mobile: '',
    name: '',
    profilePicture: ''
  });
  useEffect(() => {
    const URL = `http://engine.qberi.com/api/getProfile/${email}`;
    axios
      .get(URL)
      .then(res => {
        console.log(res.data);
        const details = {
          email: res.data.email,
          id: res.data.id,
          mobile: res.data.mobile,
          name: res.data.name,
          profilePicture: res.data.profilePicture
        };
        setProfileDetails(details);
      })
      .catch(error => {
        setError('Error fetching data from API ' + error);
      });
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
