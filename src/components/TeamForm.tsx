import { FieldArray, Formik, Form, FormikProps, useFormik } from "formik";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Container,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { generate } from "shortid";
import { PlayerForm } from "./PlayerForm";

const HIGHEST_DIVISION = 8;

const generateDivisions = (highestDivision: number) =>
  Array.from(Array(highestDivision).keys()).map((_, i) => (i + 1).toString());

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    "& > div": {
      marginBottom: "24px",
    },
  },
});

const validationSchema = yup.object().shape({
  teamName: yup.string().required("Required"),
  divisionPreference: yup.number(),
  competitionNight: yup.string(),
  delegateName: yup.string().required(),
  delegateMobile: yup.number().required(),
  delegateEmail: yup.string().email("Invalid email address").required(),
  backupDelegateName: yup.string().required(),
  backupDelegateMobile: yup.number().required(),
  backupDelegateEmail: yup.string().email("Invalid email address").required(),
  players: yup.array().of(
    yup.object().shape({
      name: yup.string(),
      dob: yup.number(),
    })
  ),
});

const initialValues = {
  teamName: "",
  divisionPreference: null,
  competitionNight: null,
  delegateName: "",
  delegateMobile: null,
  delegateEmail: "",
  backupDelegateName: "",
  backupDelegateMobile: null,
  backupDelegateEmail: "",
  players: [{ id: generate(), name: "", mobile: null, dob: null }],
};

export interface Player {
  id: string;
  name: string;
  mobile: number | null;
  dob: string | null;
}

export const TeamForm = () => {
  const classes = useStyles();

  const divisions = generateDivisions(HIGHEST_DIVISION);

  return (
    <div>
      <h1>Team Form</h1>
      <Formik
        validateOnChange
        initialValues={initialValues}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            resetForm();
          }, 400);
        }}
        validationSchema={validationSchema}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
            setFieldValue,
          } = props;

          console.log(values.players);

          return (
            <Form>
              <div className={classes.root}>
                <TextField
                  required
                  variant="outlined"
                  id="teamName"
                  name="teamName"
                  label="Team Name"
                  value={values.teamName}
                  onChange={handleChange}
                  error={touched.teamName && Boolean(errors.teamName)}
                  helperText={touched.teamName && errors.teamName}
                />

                <InputLabel htmlFor="divisionPreference">Division</InputLabel>
                <RadioGroup
                  aria-label="division"
                  id="divisionPreference"
                  name="divisionPreference"
                  value={values.divisionPreference}
                  onChange={handleChange}
                >
                  {divisions.map((division) => (
                    <FormControlLabel
                      key={division}
                      name="divisionPreference"
                      value={division}
                      control={<Radio />}
                      label={`Division ${division}`}
                    />
                  ))}
                </RadioGroup>

                <TextField
                  required
                  variant="outlined"
                  id="delegateName"
                  name="delegateName"
                  label="Delegate Name"
                  value={values.delegateName}
                  onChange={handleChange}
                  error={touched.delegateName && Boolean(errors.delegateName)}
                  helperText={touched.delegateName && errors.delegateName}
                />

                <TextField
                  required
                  variant="outlined"
                  id="delegateEmail"
                  name="delegateEmail"
                  label="Delegate Email"
                  value={values.delegateEmail}
                  onChange={handleChange}
                  error={touched.delegateEmail && Boolean(errors.delegateEmail)}
                  helperText={touched.delegateEmail && errors.delegateEmail}
                />

                <TextField
                  required
                  variant="outlined"
                  id="delegateMobile"
                  name="delegateMobile"
                  label="Delegate Mobile"
                  value={values.delegateMobile}
                  onChange={handleChange}
                  error={
                    touched.delegateMobile && Boolean(errors.delegateMobile)
                  }
                  helperText={touched.delegateMobile && errors.delegateMobile}
                />

                <TextField
                  required
                  variant="outlined"
                  id="backupDelegateName"
                  name="backupDelegateName"
                  label="Backup Delegate Name"
                  value={values.backupDelegateName}
                  onChange={handleChange}
                  error={
                    touched.backupDelegateName &&
                    Boolean(errors.backupDelegateName)
                  }
                  helperText={
                    touched.backupDelegateName && errors.backupDelegateName
                  }
                />

                <TextField
                  required
                  variant="outlined"
                  id="backupDelegateEmail"
                  name="backupDelegateEmail"
                  label="Backup Delegate Email"
                  value={values.backupDelegateEmail}
                  onChange={handleChange}
                  error={
                    touched.backupDelegateEmail &&
                    Boolean(errors.backupDelegateEmail)
                  }
                  helperText={
                    touched.backupDelegateEmail && errors.backupDelegateEmail
                  }
                />

                <TextField
                  required
                  variant="outlined"
                  id="backupDelegateMobile"
                  name="backupDelegateMobile"
                  label="Backup Delegate Mobile"
                  value={values.backupDelegateMobile}
                  onChange={handleChange}
                  error={
                    touched.backupDelegateMobile &&
                    Boolean(errors.backupDelegateMobile)
                  }
                  helperText={
                    touched.backupDelegateMobile && errors.backupDelegateMobile
                  }
                />
                <FieldArray name="players">
                  {({ push, remove }) => (
                    <div>
                      {values.players &&
                        values.players.map((player, i) => (
                          <PlayerForm
                            id={player.id}
                            name={`players[${i}]`}
                            player={player}
                            onChange={setFieldValue}
                          />
                        ))}
                      <Button
                        onClick={() =>
                          push({
                            id: generate(),
                            name: "",
                            mobile: null,
                            dob: null,
                          })
                        }
                      >
                        <AddIcon />
                        Add Player
                      </Button>
                    </div>
                  )}
                </FieldArray>

                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
