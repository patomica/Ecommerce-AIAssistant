import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FinanceProvider } from './src/context/FinanceContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <FinanceProvider>
        <RootNavigator />
        <StatusBar style="light" />
      </FinanceProvider>
    </SafeAreaProvider>
  );
}
