import Button from 'components/base/Button';
import Dropzone from 'components/base/Dropzone';
import TinymceEditor from 'components/base/TinymceEditor';
import OrganizeFormCard from 'components/cards/OrganizeFormCard';
// import VariantFormCard from 'components/cards/VariantFormCard';
// import PageBreadcrumb from 'components/common/PageBreadcrumb';
// import InventoryTab from 'components/tabs/InventoryTab';
// import { defaultBreadcrumbItems } from 'data/commonData';
import { Col, Form, Row } from 'react-bootstrap';
import AWS from 'aws-sdk';

const bucketName = process.env.REACT_APP_AWS_BUCKET_NAME as string;
const region = process.env.REACT_APP_AWS_REGION as string;
const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY as string;
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_KEY as string;

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey
});
const uploadFileToS3 = async (file: { name: any }) => {
  const params = {
    Bucket: bucketName,
    Key: file.name,
    Body: file
  };
  try {
    const data = await s3.upload(params).promise();
    console.log('File uploaded successfully:', data.Location);
    // Do something with the uploaded file location if needed
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

const AddProduct = (props: any) => {
  const handleDrop = async (acceptedFiles: string | any[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0]; // Assuming only one file is dropped
      uploadFileToS3(file);
    }
  };
  return (
    <div>
      {/* <PageBreadcrumb items={defaultBreadcrumbItems} /> */}
      <form className="mb-9">
        <div className="d-flex flex-wrap gap-3 flex-between-end mb-5">
          <div>
            <h2 className="mb-2">Add a new {props.type}</h2>
            <h5 className="text-700 fw-semi-bold">
              Orders placed across your store
            </h5>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <Button variant="phoenix-secondary" type="button">
              Discard
            </Button>
            <Button variant="primary" type="submit">
              Publish product
            </Button>
          </div>
        </div>
        <Row className="g-5">
          <Col xs={12} xl={8}>
            <h4 className="mb-3">Product Name</h4>
            <Form.Control placeholder="Write title here..." className="mb-5" />
            <div className="mb-6">
              <h4 className="mb-3">Product Description</h4>
              <TinymceEditor
                options={{
                  height: '15rem',
                  placeholder: 'Write a description here...'
                }}
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
                <OrganizeFormCard className="mb-3" type={props.type} />
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

export default AddProduct;
