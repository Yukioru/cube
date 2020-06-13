import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';

import Context from '../../App.context';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Field from '../../components/Field';
import * as Styles from './Login.styles';

const Login = () => {
  const { setUser } = useContext(Context);
  return (
    <>
      <Helmet>
        <title>Вход</title>
      </Helmet>
      <Styles.Container>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Поле не может быть пустым';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Не корректный Email адрес';
            }
            if (!values.password) {
              errors.password = 'Поле не может быть пустым';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await setUser(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => {
            const getError = field => errors[field] && touched[field] && errors[field];
            return (
              <Styles.Form onSubmit={handleSubmit}>
                <Field title="Email" help={getError('email')}>
                  <Input
                    error={getError('email')}
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </Field>
                <Field title="Пароль" help={getError('password')}>
                  <Input
                    error={getError('password')}
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </Field>
                <Button className="mt-3" block type="submit" disabled={isSubmitting}>
                  Войти
                </Button>
                <Button className="mt-3" block shadow as={Link} to="/register">
                  Регистрация
                </Button>
              </Styles.Form>
            );
          }}
        </Formik>
      </Styles.Container>
    </>
  );
};

export default Login;
