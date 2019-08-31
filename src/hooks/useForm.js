import { useState, useEffect } from 'react';

export const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);
  const [blurred, setBlurred] = useState(false);

  const onChange = e => {
    setValue(e.target.value);
    if (!touched) setTouched(true);
  };

  const onBlur = () => {
    if (!blurred && touched) {
      setBlurred(true);
    }
  };

  return {
    events: {
      onChange,
      onBlur,
    },
    state: {
      value,
      touched,
      blurred,
    }
  };
};

export const useErrors = (inputs, validate) => {
  const [errors, setErrors] = useState({});
  const inputDep = JSON.stringify(inputs);

  useEffect(() => {
    const values = Object.entries(JSON.parse(inputDep))
      .reduce((acc, curr) => [...acc, ...curr], [])
      .filter(val => typeof val === 'object' && !Array.isArray(val))
      .filter(val => val.blurred && val.touched);
    if (values.length > 0) {
      setErrors(validate(JSON.parse(inputDep)));
    }
  }, [inputDep, validate]);
  return errors;
};

const handleSubmitReady = (inputs, validate, setSubmitReady) => {
  const allTouched =
    Object.values(inputs)
      .map(value => value.touched)
      .filter(value => !value).length === 0;
  const noErrors = !Object.keys(validate(inputs)).length;
  setSubmitReady(allTouched && noErrors);
};

export const useSubmitReady = (inputs, validate) => {
  const [submitReady, setSubmitReady] = useState(false);

  useEffect(() => {
    handleSubmitReady(inputs, validate, setSubmitReady);
  }, [inputs, validate]);
  return submitReady;
};
