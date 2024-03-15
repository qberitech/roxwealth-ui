import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  // faHeart,
  // faHome,
  // faShoppingCart,
  // faStar,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EcomProfilePersonalInfo from 'components/forms/EcomProfilePersonalInfo';
// import EcomProfileOrdersTable from 'components/tables/EcomProfileOrdersTable';
// import EcomProfileReviewsTable from 'components/tables/EcomProfileReviewsTable';
// import EcomProfileStoresTable from 'components/tables/EcomProfileStoresTable';
// import EcomWishlistTable from 'components/tables/EcomWishlistTable';
import { Row, Col, Form, Nav, Tab } from 'react-bootstrap';
import Button from 'components/base/Button';
import { useState } from 'react';
import axios from 'axios';

interface TabLink {
  id: string;
  label: string;
  number?: number;
  icon: IconProp;
  content: JSX.Element;
}

const tabLinks: TabLink[] = [
  {
    id: 'orders',
    label: 'Exit',
    icon: faUser,
    content: <EcomProfilePersonalInfo />
  },
  {
    id: 'personal-info',
    label: 'Edit Details',
    icon: faUser,
    content: <EcomProfilePersonalInfo />
  }
];

interface EditProductDetailsProps {
  productName?: string;
  medicalEquipmentName?: string;
  cellBrand?: string;
  cellCapacity?: string;
  cellQuantity?: string;
  cellType?: string;
  colour?: string;
  dimensions?: string;
  price?: string;
  voltage?: string;
  weight?: string;
  // list of string
  compatibleDevice: string;
}

const EditProductDetails = ({ details }: any) => {
  const [productDetails, setProductDetails] = useState<EditProductDetailsProps>(
    {
      productName: details.productName,
      medicalEquipmentName: details.medicalEquipmentName,
      cellBrand: details.cellBrand,
      cellCapacity: details.cellCapacity,
      cellQuantity: details.cellQuantity,
      cellType: details.cellType,
      colour: details.colour,
      dimensions: details.dimensions,
      price: details.price,
      voltage: details.voltage,
      weight: details.weight,
      compatibleDevice: details.compatibleDevice as string
    }
  );

  const onChange = (e: any) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!window.confirm('Are you sure you want to save the changes?')) {
      return;
    }

    const body = {
      [details.id]: {
        productName: [productDetails.productName],
        medicalEquipmentName: [productDetails.medicalEquipmentName],
        cellBrand: [productDetails.cellBrand],
        cellCapacity: [productDetails.cellCapacity],
        cellQuantity: [productDetails.cellQuantity],
        cellType: [productDetails.cellType],
        colour: [productDetails.colour],
        dimensions: [productDetails.dimensions],
        price: [productDetails.price],
        voltage: [productDetails.voltage],
        weight: [productDetails.weight],
        // if the compatibleDevice is a string, convert it to an array, else leave it as it is
        compatibleDevice:
          typeof productDetails.compatibleDevice === 'string'
            ? [productDetails.compatibleDevice.split(',')]
            : productDetails.compatibleDevice
      }
    };
    console.log('body:', body);

    const session = JSON.parse(localStorage.getItem('session') || '{}');
    const sessionToken = session.sessionToken;
    const URL = 'https://engine.qberi.com/api/editBatteryDetails';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionToken}`
    };

    axios
      .post(URL, body, { headers })
      .then(response => {
        console.log('Response:', response.data);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <Tab.Container defaultActiveKey="orders">
      <Nav className="mb-3 pb-1 gap-3 nav-underline flex-nowrap scrollbar">
        {tabLinks.map(item => (
          <Nav.Item key={item.id}>
            <Nav.Link eventKey={item.id} className="text-nowrap">
              <FontAwesomeIcon icon={item.icon} className="me-2" />
              {item.label}{' '}
              {item.number && (
                <span className="text-700 fw-normal">({item.number})</span>
              )}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* ProductName, medicalEquipmentName, modelNumber, cellBrand , cellCapacity, cellQuantity, cellType, colour, dimentions, price, voltage, weight */}
      <Tab.Content>
        <Tab.Pane eventKey="personal-info">
          <Form>
            <Row className="gx-3 gy-4 mb-5">
              <Col xs={12} lg={6}>
                <h5 className="text-1000 mb-2">Battery Model</h5>
                <Form.Control
                  type="text"
                  name="productName"
                  placeholder="Battery Model"
                  defaultValue={details.productName}
                  onChange={onChange}
                />
              </Col>
              <Col xs={12} lg={6}>
                <h5 className="text-1000 mb-2">Medical Equipment Name</h5>
                <Form.Control
                  type="text"
                  name="medicalEquipmentName"
                  placeholder="Medical Equipment Name"
                  defaultValue={details.medicalEquipmentName}
                  onChange={onChange}
                />
              </Col>
              <Col xs={12} lg={6}>
                <h5 className="text-1000 mb-2">Model Number</h5>
                <Form.Control
                  type="text"
                  placeholder="Model Number"
                  defaultValue={details.modelNumber}
                  disabled
                />
              </Col>
              <Col xs={12} lg={6}>
                <h5 className="text-1000 mb-2">Cell Brand</h5>
                <Form.Control
                  type="text"
                  name="cellBrand"
                  placeholder="Cell Brand"
                  defaultValue={details.cellBrand}
                  onChange={onChange}
                />
              </Col>
              <Col xs={12} lg={6}>
                <h5 className="text-1000 mb-2">Cell Capacity</h5>
                <Form.Control
                  type="text"
                  name="cellCapacity"
                  placeholder="Cell Capacity"
                  defaultValue={details.cellCapacity}
                  onChange={onChange}
                />
              </Col>
              <Col xs={12} lg={6}>
                <h5 className="text-1000 mb-2">Cell Quantity</h5>
                <Form.Control
                  type="text"
                  name="cellQuantity"
                  placeholder="Cell Quantity"
                  defaultValue={details.cellQuantity}
                  onChange={onChange}
                />
              </Col>
              <Col xs={12} lg={6}>
                <h5 className="text-1000 mb-2">Cell Type</h5>
                <Form.Control
                  type="text"
                  name="cellType"
                  placeholder="Cell Type"
                  defaultValue={details.cellType}
                  onChange={onChange}
                />
              </Col>
              <Col xs={12} lg={6}>
                <h5 className="text-1000 mb-2">Colour</h5>
                <Form.Control
                  type="text"
                  name="colour"
                  placeholder="Colour"
                  defaultValue={details.colour}
                  onChange={onChange}
                />
              </Col>
              <Col xs={12} lg={6}>
                <h5 className="text-1000 mb-2">Dimensions</h5>
                <Form.Control
                  type="text"
                  name="dimensions"
                  placeholder="Dimentions"
                  defaultValue={details.dimensions}
                  onChange={onChange}
                />
              </Col>
              <Col xs={12} lg={6}>
                <h5 className="text-1000 mb-2">Price</h5>
                <Form.Control
                  type="text"
                  name="price"
                  placeholder="Price"
                  defaultValue={details.price}
                  onChange={onChange}
                />
              </Col>
              <Col xs={12} lg={6}>
                <h5 className="text-1000 mb-2">Voltage</h5>
                <Form.Control
                  type="text"
                  name="voltage"
                  placeholder="Voltage"
                  defaultValue={details.voltage}
                  onChange={onChange}
                />
              </Col>
              <Col xs={12} lg={6}>
                <h5 className="text-1000 mb-2">Weight</h5>
                <Form.Control
                  type="text"
                  name="weight"
                  placeholder="Weight"
                  defaultValue={details.weight}
                  onChange={onChange}
                />
              </Col>
              {/* compatible Devices, will be the list of items */}
              <Col xs={12} lg={6}>
                <h5 className="text-1000 mb-2">Compatible Devices</h5>
                <Form.Control
                  type="string"
                  name="compatibleDevice"
                  placeholder="Compatible Devices"
                  onChange={onChange}
                  defaultValue={details.compatibleDevice}
                />
              </Col>
            </Row>
            <Col xs={12} className="text-end">
              <Button
                type="submit"
                variant="primary"
                className="px-7 m-1"
                onClick={handleSubmit}
              >
                Save changes
              </Button>
              {/* discard changes, move to the first tab */}
              <Button
                type="submit"
                variant="outline-primary"
                className="px-7"
                onClick={() => {}}
              >
                Discard changes
              </Button>
            </Col>
          </Form>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
};

export default EditProductDetails;
