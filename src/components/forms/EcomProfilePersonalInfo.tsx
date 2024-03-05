import Button from 'components/base/Button';
// import dayjs from 'dayjs';
// import { getNumbersInRange } from 'helpers/utils';
import { Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
// import { useEffect, useState } from 'react';

const EcomProfilePersonalInfo = ({ details }: any) => {
  const onSubmit = (e: any) => {
    e.preventDefault();

    const session = JSON.parse(localStorage.getItem('session') || '{}');
    const sessionToken = session.sessionToken;
    const URL = 'https://engine.qberi.com/api/editUser';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + sessionToken
    };
    const data = {
      userId: details.id,
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      mobile: e.target[2].value
    };
    console.log('Data: ', data);
    axios
      .post(URL, data, { headers: headers })
      .then(response => {
        console.log('Profile data: ', response.data);
        if (response.status === 200) {
          alert('Profile updated successfully');
        }
        window.location.reload();
      })
      .catch(error => {
        console.error('Error fetching profile data: ', error);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <Row className="gx-3 gy-4 mb-5">
        <Col xs={12} lg={6}>
          <h5 className="text-1000 mb-2">First name</h5>
          <Form.Control
            type="text"
            placeholder="Full name"
            defaultValue={details.firstName}
          />
        </Col>
        <Col xs={12} lg={6}>
          <h5 className="text-1000 mb-2">Last name</h5>
          <Form.Control
            type="text"
            placeholder="Last name"
            defaultValue={details.lastName}
          />
        </Col>
        {/* <Col xs={12} lg={6}>
          <h5 className="text-1000 mb-2">Gender</h5>
          <Form.Select>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="not-to-say">Prefer not to say</option>
          </Form.Select>
        </Col> */}
        {/* <Col xs={12} lg={6}>
          <h5 className="text-1000 mb-2">Gender Email</h5>
          <Form.Control type="text" placeholder="Email" />
        </Col> */}
        {/* <Col xs={12} lg={6}> */}
        {/* <Row className="g-2 gy-lg-0"> */}
        {/* <Col xs={12}>
              <h5 className="text-1000 mb-2"> Date of birth</h5>
            </Col> */}
        {/* <Col xs={6} sm={2} lg={3} xl={2}>
              <Form.Select>
                {Array.from(Array(30).keys()).map(date => (
                  <option value={date} key={date}>
                    {date + 1}
                  </option>
                ))}
              </Form.Select>
            </Col> */}
        {/* <Col xs={6} sm={2} lg={3} xl={2}>
              <Form.Select>
                {dayjs.months().map(month => (
                  <option value={month} key={month}>
                    {month.slice(0, 3)}
                  </option>
                ))}
              </Form.Select>
            </Col> */}
        {/* <Col xs={12} sm={8} lg={6} xl={8}>
              <Form.Select>
                {getNumbersInRange(1990, 2023).map(year => (
                  <option value={year} key={year}>
                    {year}
                  </option>
                ))}
              </Form.Select>
            </Col> */}
        {/* </Row> */}
        {/* </Col> */}
        <Col xs={12} lg={6}>
          <h5 className="text-1000 mb-2">Mobile</h5>
          <Form.Control
            type="text"
            placeholder="+1234567890"
            defaultValue={details.mobile}
          />
        </Col>
        {/* <Col xs={12} lg={6}>
          <h5 className="text-1000 mb-2">Alternative phone</h5>
          <Form.Control type="text" placeholder="+1234567890" />
        </Col> */}
        {/* <Col xs={12} lg={4}>
          <h5 className="text-1000 mb-2">Facebook</h5>
          <Form.Control type="text" placeholder="Facebook" />
        </Col>
        <Col xs={12} lg={4}>
          <h5 className="text-1000 mb-2">Instagram</h5>
          <Form.Control type="text" placeholder="Instagram" />
        </Col>
        <Col xs={12} lg={4}>
          <h5 className="text-1000 mb-2">Twitter</h5>
          <Form.Control type="text" placeholder="Twitter" />
        </Col> */}
        {/* <Col xs={12}>
          <h5 className="text-1000 mb-2">Email</h5>
          {details.email}
        </Col> */}

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
