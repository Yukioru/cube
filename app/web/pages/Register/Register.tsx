import React from 'react';
import { Helmet } from 'react-helmet';
import { Formik, FastField, FieldMetaProps, FieldInputProps } from 'formik';
import { Link, useHistory } from 'react-router-dom';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Field from '../../components/Field';
import * as Styles from './Register.styles';

interface FormikValues {
  email: string;
  displayName: string;
  password: string;
};

interface FastFieldProps {
  meta: FieldMetaProps<FormikValues>;
  field: FieldInputProps<FormikValues>;
};

const Register = () => {
  const history = useHistory();
  const asyncCheckField = async (field: string, value: string): Promise<string | void> => {
    const res = await fetch('/api/auth/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        [field]: value,
      }),
    }).then(e => e.json());
    if (res.code === 400) {
      return res.data.message;
    }
  };

  const validateEmail = async (value: string): Promise<string | void> => {
    let error;
    const emailRx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!value) {
      error = 'Поле не может быть пустым';
    } else if (!emailRx.test(value)) {
      error = 'Не корректный Email адрес';
    } else if (emailRx.test(value)) {
      const res = await asyncCheckField('email', value);
      if (res) error = res;
    }
    return error;
  };

  const validateDisplayName = async (value: string): Promise<string | void> => {
    let error;
    if (!value) {
      error = 'Поле не может быть пустым';
    } else if (value.length <= 3) {
      error = 'Имя пользователя слишком короткое';
    } else if (value.length > 3) {
      const res = await asyncCheckField('displayName', value);
      if (res) error = res;
    }
    return error;
  };

  const validatePassword = (value: string): string | void => {
    let error;
    if (!value) {
      error = 'Поле не может быть пустым';
    }
    return error;
  };

  return (
    <>
      <Helmet>
        <title>Регистрация</title>
      </Helmet>
      <Styles.Container>
        <Formik
          initialValues={{ email: '', password: '', displayName: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            const res = await fetch('/api/auth/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            }).then(e => e.json());
            setSubmitting(false);
            if (res.code === 200) {
              history.push('/login');
            }
          }}
        >
          {({ isSubmitting, handleSubmit }) => (
            <Styles.Form onSubmit={handleSubmit}>
              <FastField name="email" validate={validateEmail}>
                {({ field, meta }: FastFieldProps) => (
                  <Field title="Email" help={meta.touched && meta.error}>
                    <Input
                      {...field}
                      error={Boolean(meta.touched && meta.error)}
                      type="email"
                    />
                  </Field>
                )}
              </FastField>
              <FastField name="displayName" validate={validateDisplayName}>
                {({ field, meta }: FastFieldProps) => (
                  <Field title="Имя пользователя" help={meta.touched && meta.error}>
                    <Input
                      {...field}
                      error={Boolean(meta.touched && meta.error)}
                      type="text"
                    />
                  </Field>
                )}
              </FastField>
              <FastField name="password" validate={validatePassword}>
                {({ field, meta }: FastFieldProps) => (
                  <Field title="Пароль" help={meta.touched && meta.error}>
                    <Input
                      {...field}
                      error={Boolean(meta.touched && meta.error)}
                      type="password"
                    />
                  </Field>
                )}
              </FastField>
              <Button className="mt-3" block type="submit" disabled={isSubmitting}>
                Зарегистрироваться
              </Button>
              <Button className="mt-3" block shadow as={Link} to="/login">
                Вход
              </Button>
            </Styles.Form>
          )}
        </Formik>
      </Styles.Container>
    </>
  );
};

export { Styles };
export default Register;
