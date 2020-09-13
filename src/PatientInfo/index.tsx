import React from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient} from "../types";


const PatientInfo: React.FC = () => {  
      const { id } = useParams<{ id: string }>();
      const [{ patients }, dispatch] = useStateValue();  // custom hook to inject the state, and the dispatcher for updating it
      
      const updatePatient = async () => {
        try {
          const { data: patient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );

          dispatch({ type: "UPDATE_PATIENT", payload: patient });
        } catch (e) {
          console.error(e.response.data);
        }
      };
      
      updatePatient();

      const patient = Object.values(patients).find((patient: Patient) => (patient.id === id));

      if (patient === undefined) {
        return (<div><p> Patient not found </p></div> );

      } else if (patient.entries === undefined) {
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
          </div>
        );
      } else {
        
        const entries = patient.entries.map((entry) => { 
          return (
            <ul key= {entry.id}>
              <li >{entry.description} </li>
              <li> {entry.creationDate} </li>
              <li> {entry.specialist} </li>
              <li> {entry.diagnosis} </li>
            </ul>
          );
        });

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
            <p> Entries: </p> 
            {entries}
          </div>
        );

      } 
};

export default PatientInfo;