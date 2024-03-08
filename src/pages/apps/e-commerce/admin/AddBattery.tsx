import Button from 'components/base/Button';
import Dropzone from 'components/base/Dropzone';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import UploadToS3 from 'Actions/UploadToS3';
import axios from 'axios';
// import TinymceEditor from 'components/base/TinymceEditor';
// import OrganizeFormCard from 'components/cards/OrganizeFormCard';
// import VariantFormCard from 'components/cards/VariantFormCard';
// import PageBreadcrumb from 'components/common/PageBreadcrumb';
// import InventoryTab from 'components/tabs/InventoryTab';
// import { defaultBreadcrumbItems } from 'data/commonData';
// import AWS from 'aws-sdk';
// import { useNavigate } from 'react-router-dom';

interface AddBatteryProps {
  productName: string;
  modelNumber: string;
  color: string;
  cellQuantity: string;
  cellCapacity: string;
  cellType: string;
  cellBrand: string;
  voltage: string;
  compatibleDevice: string[];
  otherCompatibleModels: string[];
  pictureUrl: string[];
  medicalEquipmentName: string;
  weight: string;
  dimensions: string;
  price: string;
}

const AddBattery = (props: any) => {
  const [formData, setFormData] = useState<AddBatteryProps>({
    productName: 'testProduct',
    modelNumber: 'RB-123',
    color: 'Black',
    cellQuantity: '100',
    cellCapacity: '100',
    cellType: 'Li',
    cellBrand: 'Samsung',
    voltage: '1.4',
    compatibleDevice: ['sam', 'app'],
    otherCompatibleModels: ['98'],
    pictureUrl: ['1', '2'],
    medicalEquipmentName: 'name',
    weight: '1.2',
    dimensions: '12*12*12',
    price: '100'
  });
  const [droppedFiles, setDroppedFiles] = useState<string[]>([]);

  const handleDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const res = await UploadToS3(file);
    setDroppedFiles([...droppedFiles, res as string]);
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    // const productName = e.target.productName.value as string;
    // const productDescription = e.target.productDescription.value as string;
    const images = droppedFiles as string[];
    // const model = e.target.model.value as string;
    // const color = e.target.color.value as string;
    // const cellQuantity = e.target.cellQuantity.value as string;
    // const cellCapacity = e.target.cellCapacity.value as string;
    // const cellType = e.target.cellType.value as string;
    // const cellBrand = e.target.cellBrand.value as string;
    // const voltage = e.target.voltage.value as string;
    const compatibleDevices = e.target.compatibleDevices.value as string;
    const otherCompatibleModels = e.target.otherCompatibleModels
      .value as string;
    // const medicalEquipmentName = e.target.medicalEquipmentName.value as string;
    // const weight = e.target.weight.value as string;
    // const dimensions = e.target.dimensions.value as string;
    // const price = e.target.price.value as string;

    // console.log('Form data:', productName, productDescription, images, model, color, cellQuantity, cellCapacity, cellType, cellBrand, voltage, compatibleDevices, otherCompatibleModels, medicalEquipmentName, weight, dimensions, price);

    // Body Sample for API
    // {
    //     "productName": "Rechargeable Battery-2",
    //     "modelNumber": "RB-123",
    //     "colour": "Black",
    //     "cellQuantity": "4",
    //     "cellCapacity": "3000 mAh",
    //     "cellType": "Lithium-ion",
    //     "cellBrand": "",
    //     "voltage": "3.7V",
    //     "compatibleDevice": ["Device A", "Device B"],
    //     "otherCompatibleModels": ["Model X", "Model Y"],
    //     "pictureUrl": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    //     "medicalEquipmentName": "Portable Ventilator",
    //     "weight": "200 grams",
    //     "dimensions": "10x5x3 inches",
    //     "price": "$50.99"
    //   }

    // const body = {
    //     "productName": productName,
    //     "modelNumber": model,
    //     "colour": color,
    //     "cellQuantity": cellQuantity,
    //     "cellCapacity": cellCapacity,
    //     "cellType": cellType,
    //     "cellBrand": cellBrand,
    //     "voltage": voltage,
    //     "compatibleDevice": compatibleDevices,
    //     "otherCompatibleModels": otherCompatibleModels,
    //     "pictureUrl": images,
    //     "medicalEquipmentName": medicalEquipmentName,
    //     "weight": weight,
    //     "dimensions": dimensions,
    //     "price": price
    // }
    formData.modelNumber = 'RB-123';
    formData.compatibleDevice = compatibleDevices.split(',');
    formData.otherCompatibleModels = otherCompatibleModels.split(',');
    formData.pictureUrl = images;

    const body = formData;

    console.log('Form data:', body);
    alert('Product added successfully' + JSON.stringify(body));

    const session = JSON.parse(localStorage.getItem('session') || '{}');
    const sessionToken = session.sessionToken;

    const URL = 'https://engine.qberi.com/api/registerBattery';

    const headers = {
      Authorization: `Bearer ${sessionToken}`
    };

    try {
      const response = axios.post(URL, body, { headers: headers });
      console.log('Response:', response);
      alert('Battery added successfully');
    } catch (error) {
      console.log('Error:', error);
      alert('Error adding battery' + error);
    }

    console.log('Product added successfully');
  };

  // const handleDiscard = () => {
  //   setFormData({});
  // }
  const handleChanges = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      {/* <PageBreadcrumb items={defaultBreadcrumbItems} /> */}
      <form className="mb-9" onSubmit={handleFormSubmit}>
        <div className="d-flex flex-wrap gap-3 flex-between-end mb-5">
          <div>
            <h2 className="mb-2">Add a new {props.type}</h2>
            <h5 className="text-700 fw-semi-bold">
              Orders placed across your store
            </h5>
          </div>
          <div className="d-flex flex-wrap gap-2">
            {/* <Button variant="phoenix-secondary" type="button" onClick={handleDiscard}>
              Discard
            </Button> */}
            <Button variant="primary" type="submit">
              Publish product
            </Button>
          </div>
        </div>
        <Row className="g-5">
          <Col xs={12} xl={8}>
            <h4 className="mb-3">Product Name</h4>
            {/* <Form.Control placeholder="Write title here..." className="mb-5" /> */}
            <Form.Control
              type="text"
              placeholder="Product Name"
              name="productName"
              onChange={handleChanges}
            />
            <div className="mb-6">
              <h4 className="mb-3">Product Description</h4>
              {/* <TinymceEditor
                options={{
                  height: '15rem',
                  placeholder: 'Write a description here...'
                }}
              /> */}
              <Form.Control
                as="textarea"
                placeholder="Product Description"
                name="productDescription"
              />
            </div>
            <div className="mb-5">
              <h4 className="mb-3">Display images</h4>
              <Dropzone
                onDrop={handleDrop}
                className="mb-3"
                accept={{
                  'image/*': ['.png', '.gif', '.jpeg', '.jpg']
                }}
              />
            </div>
            {/* <div>
              <h4 className="mb-3">Inventory</h4>
              <InventoryTab />
            </div> */}
          </Col>
          <Col xs={12} xl={4}>
            <Row className="g-2">
              <Col xs={12} xl={12}>
                <Card className="mb-3">
                  <Card.Body>
                    <h4 className="mb-4">Add Specifications</h4>
                    {/* fields: model, color, cell quantity, cell capacity, cell type, cell brand, voltage, compatible devices, other compatible models, medical equipment name, weight, dimensions, price */}
                    <Row className="g-3">
                      <Col xs={12} xl={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Model</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Model"
                            name="modelNumber"
                            onChange={handleChanges}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} xl={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Color</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Color"
                            name="color"
                            onChange={handleChanges}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} xl={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Cell Quantity</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Cell Quantity"
                            name="cellQuantity"
                            onChange={handleChanges}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} xl={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Cell Capacity</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Cell Capacity"
                            name="cellCapacity"
                            onChange={handleChanges}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} xl={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Cell Type</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Cell Type"
                            name="cellType"
                            onChange={handleChanges}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} xl={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Cell Brand</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Cell Brand"
                            name="cellBrand"
                            onChange={handleChanges}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} xl={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Voltage</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Voltage"
                            name="voltage"
                            onChange={handleChanges}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} xl={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Compatible Devices</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Compatible Devices"
                            name="compatibleDevices"
                            onChange={handleChanges}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} xl={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Other Compatible Models</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Other Compatible Models"
                            name="otherCompatibleModels"
                            onChange={handleChanges}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} xl={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Medical Equipment Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Medical Equipment Name"
                            name="medicalEquipmentName"
                            onChange={handleChanges}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} xl={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Weight</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Weight"
                            name="weight"
                            onChange={handleChanges}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} xl={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Dimensions</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Dimensions"
                            name="dimensions"
                            onChange={handleChanges}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} xl={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Price</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Price"
                            name="price"
                            onChange={handleChanges}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              {/* <Col xs={12} xl={12}>
                <VariantFormCard />
              </Col> */}
            </Row>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default AddBattery;
