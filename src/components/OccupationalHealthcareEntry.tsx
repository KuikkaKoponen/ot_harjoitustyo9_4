import React from 'react';
import {OccupationalHealthcareEntry} from "../types";

const OccupationalHealthcareEntryComponent: React.FC<{entry: OccupationalHealthcareEntry}> = ({ entry }) => {

  const diagnosisCodes = (entry: OccupationalHealthcareEntry) => {
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
          <li> Employer:  {entry.employerName} </li>
          {(entry.sickLeave)? <li> Sickleave: Start - {entry.sickLeave.startDate}. End - {entry.sickLeave.endDate} </li>: null}
        </ul>
          {diagnosisCodes(entry)}
      </div>
  );
  
};

export default OccupationalHealthcareEntryComponent;