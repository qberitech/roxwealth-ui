import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/base/Button';
// import Rating from 'components/base/Rating';
// import ProductColorNav from 'components/navs/ProductColorNav';
import { productColorVariants } from 'data/e-commerce';
// import { currencyFormat } from 'helpers/utils';
import ProductGallery from 'components/modules/e-commerce/ProductGallery';
import { useMemo, useState } from 'react';
import { Col, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import QuantityButtons from 'components/common/QuantityButtons';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faArchive,
  faShareAlt,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons';

const ProductDescription = ({ data }: { data: any }) => {
  console.log(data);
  const [selectedVariantKey] = useState('blue');
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = useMemo(() => {
    return productColorVariants.find(
      variant => variant.id === selectedVariantKey
    );
  }, [selectedVariantKey]);

  return (
    <Row className="g-5 mb-5 mb-lg-8">
      <Col xs={12} lg={6}>
        {selectedVariant && <ProductGallery images={selectedVariant.images} />}
        <div className="d-flex">
          <Button
            variant="outline-warning"
            size="lg"
            className="rounded-pill w-100 me-3 px-2 px-sm-4 fs--1 fs-sm-0"
          >
            <FontAwesomeIcon icon={faArchive} className="me-2" />
            Buy Now
          </Button>
          <Button
            variant="warning"
            size="lg"
            className="rounded-pill w-100 px-2 px-sm-4 fs--1 fs-sm-0"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
            Add to cart
          </Button>
        </div>
      </Col>
      <Col xs={12} lg={6}>
        <Stack className="justify-content-between h-100">
          <div className="mb-3">
            <h3 className="mb-3 lh-sm">{data[0].productName}</h3>
            <div className="d-flex flex-wrap align-items-start mb-3">
              <span className="badge bg-success fs-9 rounded-pill me-2 fw-semi-bold">
                #1 Best seller
              </span>
              <Link to="#!" className="fw-semi-bold">
                in Hospital Merch sell analytics 2021
              </Link>
            </div>
            <div className="d-flex flex-wrap align-items-center">
              <h1 className="me-3">${data[0].price}</h1>
              {/* <p className="text-500 text-decoration-line-through fs-6 mb-0 me-3">
                {currencyFormat(1499.99)}
              </p> */}
              {/* <p className="text-warning-500 fw-bolder fs-6 mb-0">10% off</p> */}
            </div>
            <p className="text-success fw-semi-bold fs-7 mb-2"> In stock</p>
            <p className="mb-2 text-800">
              <strong className="text-1000">Cell Brand : </strong>
              {data[0].cellBrand}
              <br />
              <strong className="text-1000">Model Number : </strong>
              {data[0].modelNumber}
              <br />
              <strong className="text-1000">Cell Capacity : </strong>
              {data[0].cellCapacity}
              <br />
              <strong className="text-1000">Cell Quantity : </strong>
              {data[0].cellQuantity}
              <br />
              <strong className="text-1000">Cell Type : </strong>
              {data[0].cellType}
              <br />
              <strong className="text-1000">Dimensions : </strong>
              {data[0].dimensions}
              <br />
              <strong className="text-1000">Medical Equipment Name : </strong>
              {data[0].medicalEquipmentName}
              <br />
              {/* <strong className="text-1000">
                Do you want it on Saturday, July 29th?
              </strong>{' '}
              Choose <strong className="text-1000">Saturday Delivery </strong>at
              checkout if you want your order delivered within 12 hours 43
              minutes,{' '}
              <Link className="fw-bold" to="#!">
                Details.{' '}
              </Link>
              <strong className="text-1000">Gift wrapping is available.</strong> */}
            </p>
            {/* <p className="text-danger-500 fw-bold mb-5 mb-lg-0">
              Special offer ends in 23:00:45 hours
            </p> */}
          </div>

          <div>
            <div className="mb-3">
              <p className="fw-semi-bold mb-2 text-900">
                Color : {data[0].color}
                {/* <span className="text-1100">{selectedVariant?.name}</span> */}
              </p>
              {/* <ProductColorNav
                selectedVariantKey={selectedVariantKey}
                setSelectedVariantKey={setSelectedVariantKey}
              /> */}
            </div>
            <div className="row g-3 g-sm-5 align-items-end">
              {/* <div className="col-12 col-sm-auto">
                <p className="fw-semi-bold mb-2 text-900">Size : </p>
                <div className="d-flex align-items-center">
                  <select className="form-select w-auto">
                    <option value="44">44</option>
                    <option value="22">22</option>
                    <option value="18">18</option>
                  </select>
                  <a className="ms-2 fs-9 fw-semi-bold" href="#!">
                    Size chart
                  </a>
                </div>
              </div> */}
              <div className="col-12 col-sm">
                <p className="fw-semi-bold mb-2 text-900">Quantity : </p>
                <div className="d-flex justify-content-between align-items-end">
                  <QuantityButtons
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                  <Button variant="phoenix-primary" className="px-3 border-0">
                    <FontAwesomeIcon icon={faShareAlt} className="fs-7" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Stack>
      </Col>
    </Row>
  );
};

export default ProductDescription;
