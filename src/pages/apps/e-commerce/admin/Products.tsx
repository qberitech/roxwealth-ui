import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/base/Button';
// import  {
//   FilterMenu
// } from 'components/common/FilterButtonGroup';
import FilterTab, { FilterTabItem } from 'components/common/FilterTab';
// import PageBreadcrumb from 'components/common/PageBreadcrumb';
import SearchBox from 'components/common/SearchBox';
import ProductsTable, {
  productsTablecolumns
} from 'components/tables/ProductsTable';
// import { defaultBreadcrumbItems } from 'data/commonData';
// import { productsTableData } from 'hospitalmerch/data/products';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const tabItems: FilterTabItem[] = [
  {
    label: 'All',
    value: 'all',
    count: 68817
  },
  {
    label: 'Published',
    value: 'published',
    count: 70348
  },
  {
    label: 'Drafts',
    value: 'drafts',
    count: 17
  },
  {
    label: 'On discount',
    value: 'on_discount',
    count: 810
  }
];

// const filterMenus: FilterMenu[] = [
//   {
//     label: 'Category',
//     items: [
//       {
//         label: 'Plants'
//       },
//       {
//         label: 'Furniture'
//       },
//       {
//         label: 'Fashion'
//       }
//     ]
//   },
//   {
//     label: 'Vendor',
//     items: [
//       {
//         label: 'Blue Olive Plant sellers. Inc'
//       },
//       {
//         label: 'Beatrice Furnitures'
//       },
//       {
//         label: 'Kizzstore'
//       }
//     ]
//   }
// ];

const URL = 'https://engine.qberi.com/api/allBatteryDetails';
const sessionToken = localStorage.getItem('sessionToken');
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${sessionToken}`
};

const Products = () => {
  const [allProductData, setAllProductData] = useState([]);

  const fetchData = useCallback(() => {
    axios
      .get(URL, { headers: headers })
      .then(response => {
        setAllProductData(response.data);
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const table = useAdvanceTable({
    data: allProductData,
    columns: productsTablecolumns,
    pageSize: 10,
    pagination: true,
    sortable: true,
    selection: true
  });
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    table.setGlobalFilter(e.target.value || undefined);
  };
  return (
    <div>
      {/* <PageBreadcrumb items={defaultBreadcrumbItems} /> */}
      <div className="mb-9">
        <h2 className="mb-4">Products</h2>
        <FilterTab tabItems={tabItems} className="mb-2" />
        <AdvanceTableProvider {...table}>
          <div className="mb-4">
            <div className="d-flex flex-wrap gap-3">
              <SearchBox
                placeholder="Search products"
                onChange={handleSearchInputChange}
              />
              {/* <div className="scrollbar overflow-hidden-y">
                <FilterButtonGroup menus={filterMenus} />
              </div> */}
              <div className="ms-xxl-auto">
                {/* <Button variant="link" className="text-900 me-4 px-0">
                  <FontAwesomeIcon icon={faFileExport} className="fs-9 me-2" />
                  Export
                </Button> */}
                <div className="d-flex justify-content-between">
                  <Link to="/hospitalmerch/add-product-batteries">
                    <Button variant="primary" className="mx-2">
                      <FontAwesomeIcon icon={faPlus} className="me-2" />
                      {/* Add Product */}
                      Add Product
                    </Button>
                  </Link>
                  {/* <Button variant="danger" className="mx-2">
                    <FontAwesomeIcon icon={faMinus} className="me-2" />
                    Remove Product
                  </Button> */}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
            <ProductsTable />
          </div>
        </AdvanceTableProvider>
      </div>
    </div>
  );
};

export default Products;
