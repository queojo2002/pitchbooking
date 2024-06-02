import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import MainNavigation from './src/navigation/MainNavigation';
import { persistor, store } from './src/redux/store';

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <PaperProvider>
                    <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
                    <MainNavigation />
                </PaperProvider>
            </PersistGate>
        </Provider>
    );
}
