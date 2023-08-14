import { Button, Card, LinearProgress, Stack, Typography } from '@mui/material';
import { createMedication, getMedications } from '../../api/v1';
import { useEffect, useState } from 'react';

import AddMedDialog from './AddMedDialog';
import PageHeader from '../../components/PageHeader';

const Medications = () => {
  const [meds, setMeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchMedications = async () => {
    setIsLoading(true);
    try {
      const { data } = await getMedications();

      setMeds(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  const handleAddMedication = async (body) => {
    setIsLoading(true);
    try {
      const response = await createMedication(body);

      setMeds((prev) => [
        ...prev,
        {
          ...body,
          id: response.lastID,
        },
      ]);

      setIsDialogOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMeds = meds.filter((med) => med.name && med.description);

  return (
    <>
      <PageHeader title='Medications'>
        <Button
          variant='contained'
          size='medium'
          onClick={() => setIsDialogOpen(true)}
        >
          Add Medication
        </Button>
      </PageHeader>
      {isLoading && <LinearProgress />}
      <Stack spacing={2}>
        {filteredMeds.map((med) => (
          <Card variant='outlined' key={med.id}>
            <Stack px={3} py={2} alignItems='center'>
              <Typography variant='h5' paragraph>
                {med.name}
              </Typography>
              <Typography>{med.description}</Typography>
            </Stack>
          </Card>
        ))}
      </Stack>
      {isDialogOpen && (
        <AddMedDialog
          open
          onSave={handleAddMedication}
          onClose={() => setIsDialogOpen(false)}
          loading={isLoading}
        />
      )}
    </>
  );
};

export default Medications;
