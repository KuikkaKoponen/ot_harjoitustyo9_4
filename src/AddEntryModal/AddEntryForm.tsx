import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField } from "./FormField"; // täällä hyödyllisiä funktioita tms.
import { OccupationalHealthcareEntry } from "../types";


// Totetutettu niin, että voi lähettää OccupationalHealthcareEntryn minimi vaatimuksin
// eli ilman diagnosisCodes ja sickLeave tietoja. ID tieto vaaditaan koska unohdin poistaa sen vaatimuksen back endistä, hups..
// Error handlingiä ei ole toteutettu

// Myöhemmin id:tä ei tarvii laittaa kun bäkki korjattu
//export type EntryFormValues = Omit<OccupationalHealthcareEntry, "id" >;
export type EntryFormValues = OccupationalHealthcareEntry;


// the props for our form component
interface Props {
  // both are callback functions that return void
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

// Props as our component's props, and we destructure onSubmit and onCancel from those props.
export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  return (
    // The Formik wrapper keeps a track of your form's state, and then exposes it and a few resuable methods and event handlers to your form via props
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        id: "",
        description: "",
        date: "",
        specialist: "",
        employerName : ""
      }}
      onSubmit={onSubmit}
      // validate prop, that expects a validation function and returns an object containing possible errors.
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Id (Unohdin back endiin id vaatimuksen. Kun korjattu, tämän voi poistaa)"
              placeholder="Id"
              name="id"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
             <Field
              label="Employer"
              placeholder="Employer"
              name="employerName"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid} // The submit button is enabled only if the form is valid and dirty, which means that user has edited some of the fields
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
