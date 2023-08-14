import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { getMedications } from '../../api/v1';

const AddPrescriptionDialog = ({ open, onClose, onSave, loading }) => {
  const [med, setMed] = useState('');
  const [meds, setMeds] = useState([]);
  const [comment, setComment] = useState('');

  const [isLoading, setIsLoading] = useState(false);

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

  const filteredMeds = meds.filter((med) => med.name);

  return (
    <Dialog
      open={open}
      maxWidth='sm'
      fullWidth
      onClose={!loading ? onClose : undefined}
    >
      <DialogTitle>Add new log</DialogTitle>
      <DialogContent>
        <Stack pt={2} spacing={2}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Medication</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={med}
              label='Medication'
              disabled={loading || isLoading}
              onChange={(e) => setMed(e.target.value)}
            >
              <MenuItem value=''>None</MenuItem>
              {filteredMeds.map((med) => (
                <MenuItem key={med.id} value={med.id}>
                  {med.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label='Comment'
            value={comment}
            disabled={loading}
            onChange={(e) => setComment(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          disabled={loading}
          onClick={!loading ? onClose : undefined}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          disabled={loading}
          onClick={() => onSave({ medication_id: med, comment })}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPrescriptionDialog;
