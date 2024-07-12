import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { persistor, store } from './store';
import { createStyles, MantineProvider } from '@mantine/core';
import { LoginForm } from './forms/LoginForm/LoginForm';
import { RegisterForm } from './forms/RegisterForm/RegisterForm';
import '../src/i18/i18n';

const App = () => {
  const { classes } = useStyles();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider>
          <BrowserRouter>
            <div
              style={{
                backgroundImage:
                  'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(35,51,41,1) 0%, rgba(99,212,113,1) 100%)',
              }}
              className={classes.mainContainer}>
              <Routes>
                <Route path="/">
                  <Route index element={<LoginForm />} />
                  <Route path="register" element={<RegisterForm />} />
                </Route>
              </Routes>
            </div>
          </BrowserRouter>
        </MantineProvider>
      </PersistGate>
    </Provider>
  );
};

const useStyles = createStyles(() => ({
  mainContainer: {
    display: 'flex',
    height: '100vh',
  },
}));

export default App;
