const validate = values => {
  const errors = {};

  if (values.email && values.email.touched) {
    if (!values.email.value) {
      errors.email = 'Ingrese un email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email.value)) {
      errors.email = 'Email invalido';
    }
  }

  if (values.name && values.name.touched) {
    if (!values.name.value) {
      errors.name = 'Ingrese su nombre';
    }
  }

  if (values.msg && values.msg.touched) {
    if (!values.msg.value) {
      errors.msg = 'Ingrese un mensaje';
    }
  }

  return errors;
};

export default validate;
