import {
  Button,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from '@mui/material';
import { createPrescription, getPetPrescriptions } from '../../api/v1';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import AddPrescriptionDialog from './AddPrescriptionDialog';
import PageHeader from '../../components/PageHeader';
import { StyledCardContainer } from '../pet-list-page/PetListPage.styled';

const PrescriptionsPage = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchPetPrescriptions = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await getPetPrescriptions(id);

      setPrescriptions(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPetPrescriptions(id);
  }, [id]);

  const handleCreateLog = async (body) => {
    setIsLoading(true);
    try {
      const response = await createPrescription({
        pet_id: id,
        ...body,
      });

      setPrescriptions((prev) => [
        ...prev,
        {
          ...body,
          id: response.lastID,
          pet_id: id,
        },
      ]);

      setIsDialogOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader title={`${state.name}: Prescriptions`}>
        <Button
          variant='contained'
          size='medium'
          onClick={() => setIsDialogOpen(true)}
        >
          Add Prescription
        </Button>
      </PageHeader>
      {isLoading && <LinearProgress />}

      <StyledCardContainer>
        {prescriptions.map((prescription, idx) => (
          <Card key={`${prescription.id}_${idx}`} variant='outlined'>
            <CardContent>
              <Typography variant='h4'> {prescription.status}</Typography>
              <Typography paragraph>{prescription.comment}</Typography>
              {/* <Typography paragraph>
                {new Date(prescription.dob).toISOString().substring(0, 10)}
              </Typography> */}
            </CardContent>
          </Card>
        ))}
      </StyledCardContainer>
      {isDialogOpen && (
        <AddPrescriptionDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          loading={isLoading}
          onSave={(body) => handleCreateLog(body)}
        />
      )}
    </>
  );
};

export default PrescriptionsPage;
