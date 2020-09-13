import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
    };
    case "UPDATE_PATIENT":
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.payload.id]: action.payload
        }
    };

    default:
      return state;
  }
};

export const setPatientList = ((patientListFromApi: Patient[]) => {
  const action: Action = {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi,
  };
  return action;
  });

export const addPatient = ((newPatient: Patient) => {
  const action: Action = {
    type: "ADD_PATIENT",
    payload: newPatient,
  };
  return action;
});

export const updatePatient = ((patient: Patient) => {
  const action: Action = {
    type: "UPDATE_PATIENT",
    payload: patient,
  };
  return action;
});
