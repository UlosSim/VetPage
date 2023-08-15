import axios from 'axios';

const baseURL = 'https://glittery-dull-snickerdoodle.glitch.me/';

export const fetchPets = () => axios.get(`${baseURL}v1/pets`);
export const createPet = (body) => axios.post(`${baseURL}v1/pets`, body);

export const deletePet = (id) => axios.delete(`${baseURL}v1/pets/${id}`);

// logs

export const getPetLogs = (id) => axios.get(`${baseURL}v1/logs/${id}`);

export const createPetLog = (body) => axios.post(`${baseURL}v1/logs`, body);

// prescriptions

export const getPetPrescriptions = (id) =>
  axios.get(`${baseURL}v1/prescriptions/${id}`);

export const createPrescription = (body) =>
  axios.post(`${baseURL}v1/prescriptions`, body);

// Medications

export const getMedications = () => axios.get(`${baseURL}v1/meds`);

export const createMedication = (body) => axios.post(`${baseURL}v1/meds`, body);
