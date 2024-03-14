import { ColumnDef } from '@tanstack/react-table';
import AdvanceTable from 'components/base/AdvanceTable';
// import { currencyFormat } from 'helpers/utils';
import { Link } from 'react-router-dom';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import { Batteries } from 'hospitalmerch/data/products';
import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import axios from 'axios';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import StarCheckbox from 'components/base/StarCheckbox';
// import RevealDropdown, {
//   RevealDropdownTrigger
// } from 'components/base/RevealDropdown';
// import ActionDropdownItems from 'components/common/ActionDropdownItems';
let identity;

const deleteBattery = async (id: string) => {
  const URL = 'https://engine.qberi.com/api/deleteBattery/' + id;

  const session = JSON.parse(localStorage.getItem('session') || '{}');
  const sessionToken = session.sessionToken;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionToken}`
  };

  axios
    .delete(URL, { headers: headers })
    .then(response => {
      console.log('Response:', response.data);
      // window.location.reload();
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const onClickDelete = (id: string) => {
  console.log('Delete', id);
  // Give Prompt to confirm the delete
  if (window.confirm('Are you sure you want to delete this battery?')) {
    deleteBattery(id);
  }
};

// Only the interface is comming from the products.ts and the data is been fetched in Products.tsx
export const productsTablecolumns: ColumnDef<Batteries>[] = [
  // {
  //   accessorKey: 'pictureUrl',
  //   header: 'Picture',
  //   cell: ({ row: { original } }) => {
  //     const { pictureUrl } = original;
  //     return (
  //       <Link
  //         to={`/ecommerce/product-details`}
  //         className="rounded-2 border d-inline-block"
  //       >
  //         <img src={pictureUrl} alt="" width={53} />
  //       </Link>
  //     );
  //   },
  //   meta: {
  //     headerProps: { style: { width: 70 } },
  //     cellProps: { className: 'py-0' }
  //   },
  //   enableSorting: false
  // },
  {
    accessorKey: 'medicalEquipmentName',
    header: 'Equipment Name',
    cell: ({ row: { original } }) => {
      const { medicalEquipmentName } = original;
      return <div>{medicalEquipmentName}</div>;
    },
    meta: {
      headerProps: { style: { width: 350 }, className: 'ps-4' },
      cellProps: { className: 'ps-4' }
    }
  },
  {
    accessorKey: 'productName',
    header: 'Product name',
    cell: ({ row: { original } }) => {
      const { productName } = original;
      return <div>{productName}</div>;
    },
    meta: {
      headerProps: { style: { width: 350 }, className: 'ps-4' },
      cellProps: { className: 'ps-4' }
    }
  },
  {
    accessorKey: 'cellType',
    header: 'Cell Type',
    meta: {
      headerProps: { style: { width: 150 }, className: 'ps-4' },
      cellProps: { className: 'fs-9 fw-semi-bold ps-4 text-600' }
    }
  },
  {
    id: 'compatibleDevice',
    accessorFn: ({ compatibleDevice }) => compatibleDevice.join(''),
    header: 'Compatible Devices',
    cell: ({ row: { original } }) => {
      const { compatibleDevice } = original;
      return (
        <div className="d-flex flex-wrap gap-2">
          {compatibleDevice &&
            compatibleDevice.map(tag => (
              <Link key={tag} to="#!" className="text-decoration-none">
                <Badge variant="tag">{tag}</Badge>
              </Link>
            ))}
        </div>
      );
    },
    meta: {
      headerProps: { style: { width: 250 }, className: 'ps-3' },
      cellProps: { style: { minWidth: 225 }, className: 'ps-3' }
    }
  },
  {
    id: 'id',
    accessorKey: 'id',
    header: 'Preview',
    cell: ({ row: { original } }) => {
      const { id } = original;
      identity = id;
      return (
        <Link
          to={`/hospitalmerch/product-details/${id}`}
          className="fw-semi-bold line-clamp-3"
        >
          <FontAwesomeIcon icon={faEye} /> {/* Font Awesome eye icon */}
        </Link>
      );
    },
    meta: {
      headerProps: { style: { width: 125 }, className: 'ps-1' },
      cellProps: { className: 'text-center' }
    }
  },
  // {
  //   accessorKey: 'dimensions',
  //   header: 'dimensions',
  //   cell: ({ row: { original } }) => {
  //     const { dimensions } = original;
  //     return {dimensions};
  //   },
  //   meta: {
  //     headerProps: { style: { width: 200 }, className: 'ps-4' },
  //     cellProps: { className: 'ps-4 fw-semi-bold text-start' }
  //   }
  // },
  {
    accessorKey: 'cellCapacity',
    header: 'Cell Capacity ',
    meta: {
      headerProps: { style: { width: 50 }, className: 'ps-4' },
      cellProps: { className: 'text-600 ps-4' }
    }
  },
  {
    id: 'price',
    accessorFn: ({ price }) => `${price}`,
    header: 'Price',
    cell: ({ row: { original } }) => {
      const { price } = original;
      return '$' + price;
    },
    meta: {
      headerProps: { style: { width: 150 }, className: 'ps-4 text-end' },
      cellProps: { className: 'fw-bold text-700 text-end' }
    }
  },
  {
    id: 'Delete',
    accessorKey: 'id',
    header: '',
    cell: ({ row: { original } }) => {
      const { id } = original;
      return (
        // <Link
        //   to={`/hospitalmerch/product-details/${id}`}
        //   className="fw-semi-bold line-clamp-3"
        // >
        <Button
          variant="danger"
          className="mx-2"
          onClick={() => onClickDelete(id)}
        >
          Delete
        </Button>
        // </Link>
      );
    },
    meta: {
      headerProps: { style: { width: 125 }, className: 'ps-1' },
      cellProps: { className: 'text-center' }
    }
  }
  // {
  //   id: 'action',
  //   cell: () => (
  //     <RevealDropdownTrigger>
  //       <RevealDropdown>
  //         <ActionDropdownItems />
  //       </RevealDropdown>
  //     </RevealDropdownTrigger>
  //   ),
  //   meta: {
  //     headerProps: { style: { width: '7%' } },
  //     cellProps: { className: 'text-end' }
  //   }
  // }
];

const ProductsTable = () => {
  return (
    <div>
      <AdvanceTable tableProps={{ className: 'phoenix-table fs-9' }} />
      <AdvanceTableFooter pagination />
    </div>
  );
};

export default ProductsTable;
export const id = identity;
