import { Card, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrganizeFormCard = ({
  className,
  type
}: {
  className?: string;
  type?: string;
}) => {
  return (
    <div>
      {type === 'battery' ? (
        <Card className={className}>
          <Card.Body>
            <h4 className="mb-4">Add Specifications</h4>
            {
              <Row className="gx-3 gy-4">
                {/* <Col xs={12} sm={6} xl={12}>
            <div className="d-flex gap-2 mb-2">
              <h5 className="mb-0 text-1000">Category</h5>
              <Link className="fw-bold fs-9" to="#!">
                Add new category
              </Link>
            </div>
            <Form.Select aria-label="category">
              <option value="men-cloth">Men's Clothing</option>
              <option value="women-cloth">Womens's Clothing</option>
              <option value="kid-cloth">Kid's Clothing</option>
            </Form.Select>
          </Col>
          <Col xs={12} sm={6} xl={12}>
            <div className="d-flex gap-2 mb-2">
              <h5 className="mb-0 text-1000">Vendor</h5>
              <Link className="fw-bold fs-9" to="#!">
                Add new vendor
              </Link>
            </div>
            <Form.Select aria-label="vendor">
              <option value="men-cloth">Men's Clothing</option>
              <option value="women-cloth">Womens's Clothing</option>
              <option value="kid-cloth">Kid's Clothing</option>
            </Form.Select>
          </Col>
          <Col xs={12} sm={6} xl={12}>
            <h5 className="mb-2 text-1000">Collection</h5>
            <Form.Control placeholder="Collection" />
          </Col>
          <Col xs={12} sm={6} xl={12}>
            <div className="d-flex gap-2 mb-2">
              <h5 className="mb-0 text-1000">Tags</h5>
              <Link className="fw-bold fs-9 lh-sm" to="#!">
                View all tags
              </Link>
            </div>
            <Form.Select aria-label="vendor">
              <option value="men-cloth">Men's Clothing</option>
              <option value="women-cloth">Womens's Clothing</option>
              <option value="kid-cloth">Kid's Clothing</option>
            </Form.Select>
          </Col> */}
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Model</h5>
                  <Form.Control placeholder="Model" />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Color</h5>
                  <Form.Control placeholder="Color" />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Cell Quantity</h5>
                  <Form.Control placeholder="Cell Quantity" />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Cell Capacity</h5>
                  <Form.Control placeholder="Cell Capacity" />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Cell Type</h5>
                  <Form.Control placeholder="Cell Type" />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Cell Brand</h5>
                  <Form.Control placeholder="Cell Brand" />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Voltage</h5>
                  <Form.Control placeholder="Voltage" />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Capacity</h5>
                  <Form.Control placeholder="Capacity" />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Compatible Devices</h5>
                  <Form.Control placeholder="Compatible Devices" />
                </Col>
              </Row>
            }
          </Card.Body>
        </Card>
      ) : type === 'equipment' ? (
        <Card className={className}>
          <Card.Body>
            <h4 className="mb-4">Add Specifications</h4>
            {
              <Row className="gx-3 gy-4">
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Equipment Name</h5>
                  <Form.Control placeholder="Name" />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Type</h5>
                  <Form.Control placeholder="Type" />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Other</h5>
                  <Form.Control placeholder="Cell Quantity" />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Other</h5>
                  <Form.Control placeholder="Cell Capacity" />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Other</h5>
                  <Form.Control placeholder="Cell Type" />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Other</h5>
                  <Form.Control placeholder="Cell Brand" />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Other</h5>
                  <Form.Control placeholder="Voltage" />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Other</h5>
                  <Form.Control placeholder="Capacity" />
                </Col>
                <Col xs={12} sm={6} xl={12}>
                  <h5 className="mb-2 text-1000">Compatible Devices</h5>
                  <Form.Control placeholder="Compatible Devices" />
                </Col>
              </Row>
            }
          </Card.Body>
        </Card>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default OrganizeFormCard;
