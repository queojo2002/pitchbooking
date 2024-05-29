import 'react-native-gesture-handler';
import React, { useEffect} from 'react';
import { Provider } from 'react-redux';
import MainNavigation from './src/navigation/MainNavigation'
import { Provider as PaperProvider } from 'react-native-paper';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from "expo-status-bar";
import { requestUserPermission } from './src/utils/requestUserPermission';


export default function App() {
  useEffect(() => {
    requestUserPermission();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <StatusBar barStyle='dark-content' backgroundColor="transparent" translucent/>
          <MainNavigation />
        </PaperProvider>
      </PersistGate>
    </Provider>


  );

}
