import React from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { Patient, Entry } from "../types";
import HospitalEntryComponent from "../components/HospitalEntry";
import OccupationalHealthcareEntry from "../components/OccupationalHealthcareEntry";
import HealthCheckEntry from "../components/HealthCheckEntry";


const PatientInfo: React.FC = () => {  
      const { id } = useParams<{ id: string }>();
      const [{ patients }, dispatch] = useStateValue();  // custom hook to inject the state, and the dispatcher for updating it
      
      React.useEffect(() => {
    
        const fetchPatientList = async () => {
          try {
            const { data: patient } = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id}`
            );
            //dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
            dispatch(updatePatient(patient));
          } catch (e) {
            console.error(e);
          }
        };
        fetchPatientList();
      }, [dispatch, id]);
      
      /*
      const updateOldPatient = async () => {
        try {
          const { data: patient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );

          dispatch(updatePatient(patient));
          //dispatch({ type: "UPDATE_PATIENT", payload: patient });
        } catch (e) {
          console.error(e.response.data);
        }
      };
      */
      
      //updateOldPatient();

      const patient = Object.values(patients).find((patient: Patient) => (patient.id === id));

      if (!patient) {
        return (<div><p> Patient not found </p></div> );

      } else {
        /*
        const diagnosisCodes = (entry: Entry) => {
          if (entry.diagnosisCodes) {
            const diagnoses = entry.diagnosisCodes.map((diagnose) => {
              return <li key={diagnose}> {diagnose} </li>;
            });
            return <ul> Diagnoses: {diagnoses}</ul>;
          }
        };
        */

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
            
          </div>
        );
      } 
};

export default PatientInfo;