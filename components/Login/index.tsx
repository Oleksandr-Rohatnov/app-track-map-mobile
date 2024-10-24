import { Formik } from 'formik';
import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { observer } from 'mobx-react-lite';
import CustomButton from '../CustomButton/CustomButton';
import { useStore } from '../../store/storeProvider';

const Login = observer(() => {
  const { authStore } = useStore();

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Track Map</Text>
      <Text style={styles.subtitle}>Login</Text>
      <Formik
        initialValues={{ key: '' }}
        onSubmit={async ({ key }, { setSubmitting, setFieldError, resetForm }) => {
          const isSuccess = await authStore.login(key);
          setSubmitting(false);
          if (!isSuccess) {
            setFieldError('key', 'Invalid key');
          }
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Enter Key"
              nativeID="key"
              key="key"
              onChangeText={handleChange('key')}
              onBlur={handleBlur('key')}
              value={values.key}
            />
            {touched.key && errors.key && <Text style={styles.errorText}>{errors.key}</Text>}
            <CustomButton styles={styles.button} title="SUBMIT" onPress={() => handleSubmit()} />
          </View>
        )}
      </Formik>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
    backgroundColor: '#fff'
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 8
  },
  title: {
    color: '#00648d',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 36
  },
  subtitle: {
    color: '#00648d',
    fontWeight: 'bold',
    fontSize: 40,
    marginBottom: 24
  },
  form: {
    width: '100%'
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 24
  },
  errorText: {
    color: 'red',
    fontSize: 18
  },
  button: {
    marginTop: 20
  }
});

export default Login;
