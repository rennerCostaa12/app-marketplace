import { Container } from './styles';
import { Routes } from './src/Routes';

import { ItemsFavoritesContextProvider } from './src/contexts/ItemsFavorites';

export default function App() {
  return (
    <Container>
      <ItemsFavoritesContextProvider>
        <Routes />
      </ItemsFavoritesContextProvider>
    </Container>
  );
}