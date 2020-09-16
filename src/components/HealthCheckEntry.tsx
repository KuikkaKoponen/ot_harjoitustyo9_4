import React from 'react';
import {Entry} from "../types";

const HealthCheckEntryComponent: React.FC<{entry: Entry}> = ({ entry }) => {

  const diagnosisCodes = (entry: Entry) => {
    if (entry.diagnosisCodes) {
      const diagnoses = entry.diagnosisCodes.map((diagnose) => {
        return <li key={diagnose}> {diagnose} </li>;
      });
      return <ul> Diagnoses: {diagnoses}</ul>;
    }
    return <div>Empty2</div>;
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

export default HealthCheckEntryComponent;