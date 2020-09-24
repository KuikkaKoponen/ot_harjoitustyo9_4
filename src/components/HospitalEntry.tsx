import React from 'react';
import {HospitalEntry} from "../types";

const HospitalEntryComponent: React.FC<{entry: HospitalEntry}> = ({ entry }) => {

  const diagnosisCodes = (entry: HospitalEntry) => {
    if (entry.diagnosisCodes) {
      const diagnoses = entry.diagnosisCodes.map((diagnose) => {
        return <li key={diagnose}> {diagnose} </li>;
      });
      return <ul> Diagnoses: {diagnoses}</ul>;
    }
  };

  return (
      <div key= {entry.id}>
        <p>{entry.type} entry:</p>
        <ul> 
          <li> Description: {entry.description} </li>
          <li> Date: {entry.date} </li>
          <li> Specialis:  {entry.specialist} </li>
          <li> Discharge: Date - {entry.discharge.date}. Criteria - {entry.discharge.criteria}  </li>  
        </ul>
          {diagnosisCodes(entry)}
      </div>
  );


  
};

export default HospitalEntryComponent;