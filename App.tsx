import { Container } from './styles';
import { Routes } from './src/Routes';

import { StatusBar } from 'expo-status-bar';

import { ItemsFavoritesContextProvider } from './src/contexts/ItemsFavorites';

export default function App() {
  return (
    <Container>
      <StatusBar style="auto" />
      <ItemsFavoritesContextProvider>
        <Routes />
      </ItemsFavoritesContextProvider>
    </Container>
  );
}