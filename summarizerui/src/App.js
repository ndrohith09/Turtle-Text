import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { Nav } from './components/nav';
import { Home } from './components/home';
import Auth0ProviderWithHistory from './auth0Provider';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { useAuth0 } from '@auth0/auth0-react';  
function App() {
  const { user } = useAuth0();
  console.log(user);
  return (
    <ChakraProvider theme={theme}>
    
    <Router>

    <Auth0ProviderWithHistory>       
      <Nav /> 
       <Home /> 
    </Auth0ProviderWithHistory>

    </Router>
    </ChakraProvider>
  );
}

export default App;
