import ProductDescription from 'components/modules/e-commerce/ProductDescription';
import ProductDetailsTab from 'components/modules/e-commerce/ProductDetailsTab';
import { topElectronicProducts } from 'hospitalmerch/data/products';
import SimilarProducts from 'components/sliders/SimilarProducts';
import Section from 'components/base/Section';
// import { productsTableData } from 'hospitalmerch/data/products';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Batteries } from 'hospitalmerch/data/products';
import ProductNotFound from './ProductNotFound';

const ProductDetails = () => {
  // const productData = productsTableData;
  const [myProduct, setMyProduct] = useState({} as Batteries);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const id = window.location.pathname.split('/').pop() || '';
    const URL = 'https://engine.qberi.com/api/batteryDetails/';

    const fetchData = async () => {
      try {
        const sessionToken = localStorage.getItem('sessionToken');
        const response = await axios.get(URL + id, {
          headers: {
            Authorization: `Bearer ${sessionToken}`
          }
        });
        if (response.status === 200) {
          console.log('response', response.data);
          setMyProduct(response.data);
          setLoading(false);
        }
      } catch (error) {
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ProductNotFound />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="pt-5 mb-9">
      <Section small className="py-0">
        <ProductDescription data={myProduct} />
      </Section>

      <Section small className="py-0">
        <div className="mb-9">
          <ProductDetailsTab data={myProduct} />
        </div>
      </Section>

      <Section className="py-0">
        <SimilarProducts products={topElectronicProducts} />
      </Section>
    </div>
  );
};

export default ProductDetails;
