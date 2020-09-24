import React from 'react';
import {HealthCheckEntry} from "../types";

const HealthCheckEntryComponent: React.FC<{entry: HealthCheckEntry}> = ({ entry }) => {

  const diagnosisCodes = (entry: HealthCheckEntry) => {
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
          <li> Healthcheck rating:  {entry.healthCheckRating} </li>  
        </ul>
          {diagnosisCodes(entry)}
      </div>
  );
};

export default HealthCheckEntryComponent;