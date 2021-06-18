import { Box, Button, TextField, Typography } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Field, FieldProps, getIn } from "formik";
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

const TextInput = ({ field, form: { errors, touched } }: FieldProps) => {
  const error = getIn(errors, field.name);
  const touch = getIn(touched, field.name);

  return (
    <>
      <TextField
        {...field}
        label="Name"
        InputLabelProps={{
          shrink: true,
        }}
        error={touch && Boolean(error)}
        helperText={touch && Boolean(error) && error}
      />
    </>
  );
};

const DateInput = ({ field, form: { errors } }: FieldProps) => {};

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
        <Field name={`${name}.name`} component={TextInput} />

        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          name={`${name}.dob`}
          label="Date of birth"
          value={player.dob}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(
            date: MaterialUiPickersDate,
            value?: string | null | undefined
          ) => {
            onChange(`${name}.dob`, date);
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};
