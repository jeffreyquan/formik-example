import { Box, Button, TextField, Typography } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Field, FieldProps, getIn, useField } from "formik";
import ClearIcon from "@material-ui/icons/Clear";
import { Player } from "./TeamForm";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    border: "1px solid grey",
    borderRadius: "4px",
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

interface PlayerFormProps {
  index: number;
  name: string;
  player: Player;
  removePlayer: (index: number) => void;
  onChange: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}

const TextInput = ({
  label,
  name,
  ...props
}: {
  label: string;
  name: string;
}) => {
  const [field, meta, helpers] = useField(name);
  const { error, touched } = meta;
  return (
    <>
      <TextField
        {...field}
        {...props}
        label={label}
        InputLabelProps={{
          shrink: true,
        }}
        error={touched && Boolean(error)}
        helperText={touched && Boolean(error) && error}
      />
    </>
  );
};

const DateInput = ({
  field,
  form: { errors, touched, setFieldValue },
}: FieldProps) => {
  const error = getIn(errors, field.name);
  const touch = getIn(touched, field.name);

  return (
    <KeyboardDatePicker
      {...field}
      disableToolbar
      variant="inline"
      format="dd/MM/yyyy"
      margin="normal"
      label="Date of birth"
      KeyboardButtonProps={{
        "aria-label": "change date",
      }}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={(date: MaterialUiPickersDate, value) => {
        setFieldValue(field.name, date);
      }}
      error={touch && Boolean(error)}
      helperText={touch && Boolean(error) && error}
    />
  );
};

export const PlayerForm: React.FC<PlayerFormProps> = ({
  index,
  name,
  player,
  removePlayer,
  onChange,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Box className={classes.title}>
          <Typography variant="h2">Player {index + 1}</Typography>
          <Button onClick={() => removePlayer(index)}>
            <ClearIcon />
          </Button>
        </Box>
        <TextInput name={`${name}.name`} label="Name" />
        <Field name={`${name}.dob`} component={DateInput} />
      </MuiPickersUtilsProvider>
    </div>
  );
};
