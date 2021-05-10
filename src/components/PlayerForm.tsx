import { TextField } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Player } from "./TeamForm";
import { ChangeEvent } from "react";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Field, FieldProps, getIn } from "formik";

interface PlayerFormProps {
  id: string;
  name: string;
  player: Player;
  onChange: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}

const TextInput = ({ field, form: { errors } }: FieldProps) => {
  const errorMessage = getIn(errors, field.name);

  return (
    <>
      <TextField {...field} />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </>
  );
};

const DateInput = ({ field, form: { errors } }: FieldProps) => {};

export const PlayerForm: React.FC<PlayerFormProps> = ({
  id,
  name,
  player,
  onChange,
}) => {
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
