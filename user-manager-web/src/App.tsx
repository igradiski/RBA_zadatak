import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { persistor, store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider>
          <BrowserRouter>
            <div
              style={{
                backgroundImage:
                  'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(35,51,41,1) 0%, rgba(99,212,113,1) 100%)',
              }}>
              <p>sdads</p>
            </div>
          </BrowserRouter>
        </MantineProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;
