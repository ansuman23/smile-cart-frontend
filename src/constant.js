import * as yup from "yup";

export const VALIDATION_SCHEMA = yup.object().shape({
  firstName: yup.string().required("Name is required"),
  age: yup.number().required("age is required"),
});
