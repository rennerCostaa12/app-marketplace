import { Container } from './styles';
import { Routes } from './src/Routes';


import { StatusBar } from 'expo-status-bar';

import { useFonts, Lato_400Regular, Lato_700Bold, Lato_300Light } from '@expo-google-fonts/lato';

import { ItemsFavoritesContextProvider } from './src/contexts/ItemsFavorites';

export default function App() {
  let [fontLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
    Lato_300Light
  })

  if(!fontLoaded){
    return null;
  }

  return (
    <Container>
      <StatusBar style="auto" />
      <ItemsFavoritesContextProvider>
        <Routes />
      </ItemsFavoritesContextProvider>
    </Container>
  );
}