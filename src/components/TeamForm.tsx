import { FieldArray, Formik, Form, FormikProps, useFormik } from "formik";
import yup from "../yup-extended";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { nanoid } from "nanoid";
import { PlayerForm } from "./PlayerForm";

const HIGHEST_DIVISION = 8;

const competitionNights = ["Monday", "Tuesday", "Wednesday", "Thursday"];

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
    "& input": {
      minWidth: "250px",
    },
  },
  players: {
    "& > div": {
      marginBottom: "24px",
    },
  },
});

const validationSchema = yup.object().shape({
  teamName: yup.string().required("Please enter a team name."),
  divisionPreference: yup.number().required("Please select a division."),
  competitionNight: yup.string().required("Please select a competition night."),
  delegateName: yup.string().required("Please enter the delegate's name."),
  delegateMobile: yup.string().isMobile("Invalid mobile number."),
  delegateEmail: yup
    .string()
    .email("Invalid email address.")
    .required("Please enter the delegate's email address."),
  backupDelegateName: yup
    .string()
    .required("Please enter the backup delegate's name."),
  backupDelegateMobile: yup
    .string()
    .isMobile("Invalid mobile number.")
    .required("Please enter the backup delegate's mobile."),
  backupDelegateEmail: yup
    .string()
    .email("Invalid email address")
    .required("Please enter the backup delegate's email address."),
  players: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Player name is required."),
      dob: yup.string(),
    })
  ),
});

const initialValues = {
  teamName: "",
  divisionPreference: "",
  competitionNight: "",
  delegateName: "",
  delegateMobile: "",
  delegateEmail: "",
  backupDelegateName: "",
  backupDelegateMobile: "",
  backupDelegateEmail: "",
  players: [{ id: nanoid(), name: "", mobile: "", dob: "" }],
};

export interface Player {
  id: string;
  name: string;
  mobile: string | null;
  dob: string | null;
}

export const TeamForm = () => {
  const classes = useStyles();

  const divisions = generateDivisions(HIGHEST_DIVISION);

  return (
    <Container maxWidth="lg">
      <Typography variant="h1" align="center">
        Team Form
      </Typography>
      <Formik
        validateOnChange
        initialValues={initialValues}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          console.log({ values });
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            resetForm();
          }, 400);
        }}
        validationSchema={validationSchema}
      >
        {({
          values,
          touched,
          errors,
          handleBlur,
          handleChange,
          isSubmitting,
          setFieldValue,
        }) => {
          return (
            <Form>
              <div className={classes.root}>
                <TextField
                  required
                  id="teamName"
                  name="teamName"
                  label="Team Name"
                  onBlur={handleBlur}
                  value={values.teamName}
                  onChange={handleChange}
                  error={touched.teamName && Boolean(errors.teamName)}
                  helperText={touched.teamName && errors.teamName}
                  InputLabelProps={{
                    shrink: true,
                  }}
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

                <InputLabel htmlFor="competitionNight">
                  Competition Night
                </InputLabel>
                <RadioGroup
                  aria-label="division"
                  id="competitionNight"
                  name="competitionNight"
                  value={values.competitionNight}
                  onChange={handleChange}
                >
                  {competitionNights.map((night) => (
                    <FormControlLabel
                      key={night}
                      name="competitionNight"
                      value={night}
                      control={<Radio />}
                      label={night}
                    />
                  ))}
                </RadioGroup>

                <TextField
                  required
                  id="delegateName"
                  name="delegateName"
                  label="Delegate Name"
                  onBlur={handleBlur}
                  value={values.delegateName}
                  onChange={handleChange}
                  error={touched.delegateName && Boolean(errors.delegateName)}
                  helperText={touched.delegateName && errors.delegateName}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  required
                  id="delegateEmail"
                  name="delegateEmail"
                  label="Delegate Email"
                  value={values.delegateEmail}
                  onChange={handleChange}
                  error={touched.delegateEmail && Boolean(errors.delegateEmail)}
                  helperText={touched.delegateEmail && errors.delegateEmail}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  required
                  id="delegateMobile"
                  name="delegateMobile"
                  label="Delegate Mobile"
                  onBlur={handleBlur}
                  value={values.delegateMobile}
                  onChange={handleChange}
                  error={
                    touched.delegateMobile && Boolean(errors.delegateMobile)
                  }
                  helperText={touched.delegateMobile && errors.delegateMobile}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  required
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  required
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  required
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <FieldArray name="players">
                  {({ push, remove }) => (
                    <Box className={classes.players}>
                      <Typography variant="h2">Players</Typography>
                      {values.players &&
                        values.players.map((player, i) => (
                          <PlayerForm
                            key={player.id}
                            index={i}
                            name={`players[${i}]`}
                            player={player}
                            removePlayer={remove}
                            onChange={setFieldValue}
                          />
                        ))}
                      <Button
                        onClick={() =>
                          push({
                            id: nanoid(),
                            name: "",
                            mobile: "",
                            dob: "",
                          })
                        }
                      >
                        <AddIcon />
                        Add Player
                      </Button>
                    </Box>
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
    </Container>
  );
};
