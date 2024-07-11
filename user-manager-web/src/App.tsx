import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from "./store";
import { createStyles, MantineProvider } from "@mantine/core";

const App = () => {
  const { classes } = useStyles();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider>
          <BrowserRouter>
            <div className={classes.mainContainer}>
              <p>fff</p>
            </div>
          </BrowserRouter>
        </MantineProvider>
      </PersistGate>
    </Provider>
  );
};

const useStyles = createStyles(() => ({
  mainContainer: {
    display: "flex",
    height: "100vh",
    margin: "0px",
    backgroundColor: "red",
  },
}));

export default App;
