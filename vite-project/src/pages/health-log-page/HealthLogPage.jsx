import {
  Button,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from '@mui/material';
import { createPetLog, getPetLogs } from '../../api/v1/index';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import AddLogDialog from './AddLogDialog';
import PageHeader from '../../components/PageHeader';
import { StyledCardContainer } from '../pet-list-page/PetListPage.styled';

const HealthLogPage = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchPetLogs = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await getPetLogs(id);

      setLogs(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPetLogs(id);
  }, [id]);

  const handleCreateLog = async (body) => {
    setIsLoading(true);
    try {
      const response = await createPetLog({
        pet_id: id,
        description: body.description,
        status: body.status,
      });

      setLogs((prev) => [
        ...prev,
        {
          id: response.lastID,
          pet_id: id,
          description: body.description,
          status: body.status,
          dob: new Date().getTime(),
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
      <PageHeader title={`${state.name}: Health Records`}>
        <Button
          variant='contained'
          size='medium'
          onClick={() => setIsDialogOpen(true)}
        >
          Add Log
        </Button>
      </PageHeader>
      {isLoading && <LinearProgress />}

      <StyledCardContainer>
        {logs.map((log, idx) => (
          <Card key={`${log.id}_${idx}`} variant='outlined'>
            <CardContent>
              <Typography variant='h4'> {log.status}</Typography>
              <Typography paragraph>{log.description}</Typography>
              <Typography paragraph>
                {new Date(log.dob).toISOString().substring(0, 10)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </StyledCardContainer>
      {isDialogOpen && (
        <AddLogDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          loading={isLoading}
          onSave={(body) => handleCreateLog(body)}
        />
      )}
    </>
  );
};

export default HealthLogPage;
