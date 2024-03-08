import Button from 'components/base/Button';
import { Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import AvatarUpload from 'components/common/AvatarUpload';

const EcomProfilePersonalInfo = ({ details }: any) => {
  const mobile = details.mobile ?? '';
  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const session = JSON.parse(localStorage.getItem('session') || '{}');
      const sessionToken = session.sessionToken;
      const URL = 'https://engine.qberi.com/api/editUser';
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionToken}`
      };
      const { value: firstName } = e.target[1];
      const { value: lastName } = e.target[2];
      const { value: mobile = '' } = e.target[4];

      const data = {
        userId: details.id,
        firstName,
        lastName,
        mobile
      };

      const response = await axios.post(URL, data, { headers });

      if (response.status === 200) {
        alert('Profile updated successfully');
        // Update local state here (optional)
        window.location.reload();
      } else {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Row className="gx-3 gy-4 mb-5">
        <Col xs={12} lg={4}>
          <AvatarUpload size="5xl" src={details.pictureUrl} />
        </Col>

        <Col xs={12} lg={8}>
          <h5 className="text-1000 mb-2">First name</h5>
          <Form.Control
            type="text"
            placeholder="Full name"
            defaultValue={details.firstName}
          />
          <br />
          <h5 className="text-1000 mb-2">Last name</h5>
          <Form.Control
            type="text"
            placeholder="Last name"
            defaultValue={details.lastName}
          />
        </Col>
        <Col xs={12} lg={6}>
          <h5 className="text-1000 mb-2">Email</h5>
          <Form.Control
            type="text"
            placeholder="Email"
            value={details.email}
            disabled
          />
        </Col>
        <Col xs={12} lg={6}>
          <h5 className="text-1000 mb-2">Mobile</h5>
          <Form.Control
            type="text"
            placeholder="+1234567890"
            defaultValue={mobile ?? ''}
          />
        </Col>
        <Col xs={12} lg={6}>
          <h5 className="text-1000 mb-2">Role</h5>
          <Form.Control
            type="text"
            placeholder="Role"
            value={details.role === 'admin' ? 'Admin' : 'User'}
            disabled
          />
        </Col>

        <Col xs={12} lg={6}>
          <h5 className="text-1000 mb-2">Share Percentage</h5>
          <Form.Control
            type="text"
            placeholder="Share Percentage"
            value={details.sharePercentage ?? '0'}
            disabled
          />
        </Col>

        <Col xs={12} className="text-end">
          <Button type="submit" variant="primary" className="px-7">
            Save changes
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default EcomProfilePersonalInfo;
