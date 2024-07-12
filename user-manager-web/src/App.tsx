import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { persistor, store } from './store';
import { createStyles, MantineProvider } from '@mantine/core';
import { LoginForm } from './forms/LoginForm/LoginForm';
import { RegisterForm } from './forms/RegisterForm/RegisterForm';
import '../src/i18/i18n';
import { UserManagementScreen } from './screens/UserManagementScreen';
import { ProtectedRoute } from './route/protectedRoute';

const App = () => {
  const { classes } = useStyles();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider>
          <BrowserRouter>
            <div className={classes.mainContainer}>
              <Routes>
                <Route path="/">
                  <Route index element={<LoginForm />} />
                  <Route path="register" element={<RegisterForm />} />
                </Route>
                <Route path="/userManagement" element={<ProtectedRoute />}>
                  <Route index element={<UserManagementScreen />} />
                </Route>
              </Routes>
            </div>
          </BrowserRouter>
        </MantineProvider>
      </PersistGate>
    </Provider>
  );
};

const useStyles = createStyles(theme => ({
  mainContainer: {
    display: 'flex',
    height: '100vh',
    background: `linear-gradient(135deg, ${theme.colors.indigo[6]}, ${theme.colors.cyan[4]})`,
  },
}));

export default App;
