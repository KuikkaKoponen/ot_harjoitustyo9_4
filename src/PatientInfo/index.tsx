import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";


const PatientInfo: React.FC = () => {  
      const { id } = useParams();
      const [patient, setPatient] = useState({name: "", gender: "", occupation: "", dateOfBirth: "", });
      
      React.useEffect(() => {   
        const fetchPatientList = async () => {
          try {
            const { data: patient } = await axios.get(
              `${apiBaseUrl}/patients/${id}`
            );
            setPatient(patient);

          } catch (e) {
            console.error(e);
          }
        };
        fetchPatientList();
      }, [id]);

      
      return (
        <div className="patient-info">
          <h1>Patient information </h1>
          <p> {patient.name} </p> 
          <ul> 
            <li>gender: {patient.gender}</li>
            <li>occupation: {patient.occupation}</li>
            <li>name: {patient.name}</li>
            <li> date of birth: {patient.dateOfBirth}</li>
          </ul>
        </div>
      );
};

export default PatientInfo;
