import React from "react";

import { Button } from "@bigbinary/neetoui";
import { Form as NeetoUIForm, Input } from "neetoui/formik";

import { VALIDATION_SCHEMA } from "./constant";

const FormTemp = () => {
  const handleSubmission = values => {
    console.log(values);
  };

  return (
    <NeetoUIForm
      formikProps={{
        initialValues: { firstName: "", age: "" },
        validationSchema: VALIDATION_SCHEMA,
        onSubmit: handleSubmission,
      }}
    >
      <Input name="firstName" placeholder="Enter a name" type="text" />
      <Input name="age" placeholder="Enter age" type="number" />
      <Button label="submit" type="submit" />
    </NeetoUIForm>
  );
};

export default FormTemp;
