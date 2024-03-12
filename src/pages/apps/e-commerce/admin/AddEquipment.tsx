import Button from 'components/base/Button';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useAdvanceTable from 'hooks/useAdvanceTable';
import { ColumnDef } from '@tanstack/react-table';
import AdvanceTable from 'components/base/AdvanceTable';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';

type Equipment = {
  id: string;
  name: string;
  enabled: boolean;
};

const session = JSON.parse(localStorage.getItem('session') || '{}');
const sessionToken = session.sessionToken;

const headers = {
  Authorization: `Bearer ${sessionToken}`
};

const editEquipment = (id: string, currentState: boolean) => {
  console.log('Current State: ', currentState);

  const question = currentState ? 'Disable' : 'Enable';

  if (window.confirm(`Are you sure you want to ${question} this equipment?`)) {
    console.log('Edit Equipment: ', id);
  }
};

const medicalTableColumns: ColumnDef<Equipment>[] = [
  {
    header: 'Equipment Name',
    accessorKey: 'name',
    cell: ({ row: { original } }) => {
      return <>{original.name || 'N/A'}</>;
    },
    meta: {
      headerProps: { style: { width: 300 } }
    }
  },
  {
    header: 'Enabled',
    accessorKey: 'enabled',
    cell: ({ row: { original } }) => {
      return <>{original.enabled ? 'Yes' : 'No'}</>;
    }
  },
  {
    header: 'Action',
    cell: ({ row: { original } }) => {
      return (
        <Button
          variant="phoenix-secondary"
          className="btn-sm"
          onClick={() => editEquipment(original.id, original.enabled)}
        >
          Edit
        </Button>
      );
    }
  }
];

interface AddEquipmentProps {
  name: string;
  enabled: boolean;
}

const AddEquipment = (props: any) => {
  const [formData, setFormData] = useState<AddEquipmentProps>({
    name: '',
    enabled: true
  });

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    const URL = 'https://engine.qberi.com/api/registerMedicalEquipment';

    try {
      axios
        .post(URL, formData, { headers: headers })
        .then(res => {
          console.log('Response:', res);
          alert('Product added successfully');
        })
        .catch(error => {
          console.log('Error:', error);
          alert('Error adding battery' + error);
        });
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

  const [allEquipments, setAllEquipments] = useState([]);

  const fetchEquipment = async () => {
    const URL = 'https://engine.qberi.com/api/allMedicalEquipments';
    try {
      const response = await axios.get(URL, {
        headers: headers
      });
      if (response.status === 200) {
        setAllEquipments(response.data);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);
  const equipmentTable = useAdvanceTable({
    data: allEquipments,
    columns: medicalTableColumns,
    selection: true,
    sortable: true,
    pagination: true,
    pageSize: 10
  });
  return (
    <div>
      <form className="mb-9" onSubmit={handleFormSubmit}>
        <div className="d-flex flex-wrap gap-3 flex-between-end mb-5">
          <div>
            <h2 className="mb-2">List of {props.type}s</h2>
          </div>
        </div>
        <Row className="g-5 p-2">
          <Col xs={12} xl={7} className="m-2">
            <AdvanceTableProvider {...equipmentTable}>
              <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
                <AdvanceTable
                  tableProps={{ className: 'phoenix-table fs-9' }}
                />
                <AdvanceTableFooter pagination />
              </div>
            </AdvanceTableProvider>
          </Col>
          <Col xs={12} xl={4} className="m-2">
            <Row className="g-2">
              <Col xs={12} xl={12}>
                <Card className="mb-3">
                  <Card.Body>
                    <h4 className="mb-4">Add Medical Equipment</h4>
                    <Row className="g-3">
                      <Col xs={12} xl={12}>
                        <Form.Group className="mb-3">
                          <h5 className="mb-2 text-1000">Equipment Name</h5>
                          <Form.Control
                            type="text"
                            placeholder="String"
                            name="name"
                            onChange={handleChanges}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} xl={12}>
                        <Form.Group className="mb-3">
                          <h5 className="mb-2 text-1000">Enabled</h5>
                          {/* Toggle button for enable and disable */}
                          <Form.Check
                            type="switch"
                            id="custom-switch"
                            name="enabled"
                            label={formData.enabled ? 'Enabled' : 'Disabled'}
                            // set the value to the state
                            defaultChecked={true}
                            onChange={handleChanges}
                            // bigger size
                            size={10}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                <div className="d-flex flex-wrap gap-2">
                  <Button variant="primary" type="submit">
                    Add Equipment
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default AddEquipment;
