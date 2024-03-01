import ProductDescription from 'components/modules/e-commerce/ProductDescription';
import ProductDetailsTab from 'components/modules/e-commerce/ProductDetailsTab';
import { topElectronicProducts } from 'hospitalmerch/data/products';
import SimilarProducts from 'components/sliders/SimilarProducts';
import Section from 'components/base/Section';
import { productsTableData } from 'hospitalmerch/data/products';

console.log(productsTableData);
const ProductDetails = () => {
  let productData = productsTableData;
  return (
    <div className="pt-5 mb-9">
      <Section small className="py-0">
        <ProductDescription data={productData} />
      </Section>

      <Section small className="py-0">
        <div className="mb-9">
          <ProductDetailsTab data={productData} />
        </div>
      </Section>

      <Section className="py-0">
        <SimilarProducts products={topElectronicProducts} />
      </Section>
    </div>
  );
};

export default ProductDetails;
