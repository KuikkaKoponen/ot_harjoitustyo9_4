import React from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { Patient, Entry } from "../types";
import HospitalEntryComponent from "../components/HospitalEntry";
import OccupationalHealthcareEntry from "../components/OccupationalHealthcareEntry";
import HealthCheckEntry from "../components/HealthCheckEntry";
import { Button } from "semantic-ui-react";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";


const PatientInfo: React.FC = () => {  
      const { id } = useParams<{ id: string }>();
      const [{ patients }, dispatch] = useStateValue();  // custom hook to inject the state, and the dispatcher for updating it
      
      // useState hook for managing modal visibility and form error handling <- erron handlingiä ei toteutettu
      const [modalOpen, setModalOpen] = React.useState<boolean>(false);
      const openModal = (): void => setModalOpen(true);
      const closeModal = (): void => setModalOpen(false); 

      // onko järkevämpää tapaa latada tietoja. Tuntuu, että tämä kestää aika kauan
      React.useEffect(() => {
    
        const fetchPatientList = async () => {
          try {
            const { data: patient } = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id}`
            );
            dispatch(updatePatient(patient));
          } catch (e) {
            console.error(e);
          }
        };
        fetchPatientList();
      }, [dispatch, id]);


      // Tässä olisi paranneltavaa
      const submitNewEntry= async (values: EntryFormValues) => {
        try {
          console.log('Submit');
          console.log(values);
          
        // Kaiva osoitekentästä patient id. Siitä muodostetaan url osoite mihin post lähetetään

        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
        closeModal();

        console.log(`Saatiin vastaus: ${newEntry}`);
        
        // Tee tallennus taulukkoon. Nyt kierretty reloadaamalla page..
        // Vaihtoehtoisesti Pitäiskö backin heittää koko patient niin vois käyttää samaa addPatient/update patient reducerii
        // dispatch(addEntry(newEntry));
        window.location.reload();
          
        } catch (e) {
          console.error(e.response.data);
        }
      };

      const patient = Object.values(patients).find((patient: Patient) => (patient.id === id));

      if (!patient) {
        return (<div><p> Patient not found </p></div> );

      } else {

        /**
         * Helper function for exhaustive type checking
         */
        const assertNever = (entry: never): never => {
          throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(entry)}`
          );
        };
        
        const EntryDetails: React.FC<{ entry: Entry}> = ({ entry }) => {
          switch (entry.type) {
          case "Hospital":
            return <HospitalEntryComponent entry={entry}/>;
          case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry}/>;
          case "HealthCheck":
            return <HealthCheckEntry entry={entry}/>;  
          default: 
          return assertNever(entry);
          }
        };
        
        const entries = (patient: Patient ) => {
            if (patient.entries && patient.entries.length > 0) {
              return patient.entries.map(entry => { 
              // aina pitää olla return
              return (<div key = {entry.id}> <EntryDetails entry={entry}/> </div>); 
              }); 
            }    
            return <div>No Entries</div>; 
        };
 
        return (
         <div className="patient-info">
            <h1>Patient information </h1>
            <p> {patient.name} </p> 
            <ul> 
              <li>Gender: {patient.gender}</li>
              <li>Occupation: {patient.occupation}</li>
              <li>Name: {patient.name}</li>
              <li>Date of birth: {patient.dateOfBirth}</li>  
            </ul>
            {entries(patient)}
  

            <AddEntryModal
              modalOpen={modalOpen}
              onSubmit={submitNewEntry}
              onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>


          </div>
        );
      } 
};

export default PatientInfo;