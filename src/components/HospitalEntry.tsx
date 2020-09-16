import React from 'react';
import {HospitalEntry} from "../types";

const HospitalEntryComponent = (entry: HospitalEntry) => {

  const diagnosisCodes = (entry: HospitalEntry) => {
    if (entry.diagnosisCodes) {
      const diagnoses = entry.diagnosisCodes.map((diagnose) => {
        return <li key={diagnose}> {diagnose} </li>;
      });
      return <ul> Diagnoses: {diagnoses}</ul>;
    }
  };

  if (entry) {
      return (
          <div key= {entry.id}>
            <ul>
              <li >{entry.description} </li>
              <li> {entry.date} </li>
              <li> {entry.specialist} </li>  
            </ul>
              {diagnosisCodes(entry)}
          </div>
      );

  } else {
    return <div>Empty</div>;
  }
  
};

export default HospitalEntryComponent;