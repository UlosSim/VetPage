import {
  Button,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { createPet, deletePet, fetchPets } from '../../api/v1';
import { useEffect, useState } from 'react';

import AddPetDialog from './AddPetDialog';
import PageHeader from '../../components/PageHeader';
import { StyledCardContainer } from './PetListPage.styled';
import { useNavigate } from 'react-router-dom';

const PetListPage = () => {
  const [petList, setPetList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();

  const fetchPetList = async () => {
    try {
      setIsLoading(true);
      const { data } = await fetchPets();
      setPetList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPetList();
  }, []);

  const onDialogClose = () => setIsDialogOpen(false);

  const handleAddPet = async (body) => {
    try {
      const response = await createPet({
        name: body.name,
        dob: body.date,
        client_email: body.email,
      });

      setPetList((prev) => [
        ...prev,
        {
          client_email: body.email,
          id: response.lastID,
          name: body.name,
          dob: new Date(body.date).getTime(),
        },
      ]);

      setIsDialogOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePet = async (id) => {
    setIsLoading(true);
    try {
      await deletePet(id);

      setPetList((prev) => prev.filter((pet) => pet.id !== id));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const card = (petData) => {
    return (
      <>
        <CardContent>
          <Typography variant='h4'> {petData.name}</Typography>
          <Typography paragraph={true}>
            {new Date(petData.dob).toISOString().substring(0, 10)}
          </Typography>
          <Typography paragraph={true}>{petData.client_email}</Typography>
        </CardContent>
        <Stack spacing={1} alignItems='center' pb={3}>
          <Button
            variant='contained'
            disabled={isLoading}
            onClick={() =>
              navigate(`/healthLogs/${petData.id}`, {
                state: {
                  name: petData.name,
                },
              })
            }
          >
            View log
          </Button>
          <Button
            variant='contained'
            disabled={isLoading}
            onClick={() =>
              navigate(`/prescriptions/${petData.id}`, {
                state: {
                  name: petData.name,
                },
              })
            }
          >
            View prescriptions
          </Button>
          <Button
            variant='outlined'
            disabled={isLoading}
            onClick={() => handleDeletePet(petData.id)}
          >
            Delete
          </Button>
        </Stack>
      </>
    );
  };

  return (
    <>
      <PageHeader title='Pet List'>
        <Button
          variant='contained'
          size='medium'
          onClick={() => setIsDialogOpen(true)}
        >
          Add Pet
        </Button>
      </PageHeader>
      {isLoading && <LinearProgress />}
      <StyledCardContainer>
        {petList.map((pet) => (
          <Card key={pet.id} variant='outlined'>
            {card(pet)}
          </Card>
        ))}
      </StyledCardContainer>
      {isDialogOpen && (
        <AddPetDialog
          loading={isLoading}
          open={isDialogOpen}
          onClose={onDialogClose}
          onSave={handleAddPet}
        />
      )}
    </>
  );
};

export default PetListPage;
