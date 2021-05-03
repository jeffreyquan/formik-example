import { Formik, Form, FormikProps, useFormik } from "formik";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const validationSchema = yup.object({
  firstName: yup
    .string()
    .max(16, "Must be 16 characters or less")
    .required("Required"),
  lastName: yup
    .string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: yup.string().email("Invalid email address").required("Required"),
  mobile: yup.number().required(),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  address: "",
  postcode: "",
  state: "",
};

export const EmploymentForm = () => {
  return (
    <div>
      <h1>Employment Form</h1>
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
          } = props;
          return (
            <Form>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={values.firstName}
                onChange={handleChange}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />

              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={values.lastName}
                onChange={handleChange}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />

              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextField
                fullWidth
                id="mobile"
                name="mobile"
                label="Mobile"
                value={values.mobile}
                onChange={handleChange}
                error={touched.mobile && Boolean(errors.mobile)}
                helperText={touched.mobile && errors.mobile}
              />

              <Button
                variant="contained"
                color="primary"
                disableElevation
                type="submit"
              >
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
