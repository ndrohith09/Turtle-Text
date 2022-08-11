import React from 'react';
import Eloborator from './eloborator';
import { Hero } from './hero';
import Summarizer from './summarizer';
import { 
    Container , Heading , useMediaQuery
} from '@chakra-ui/react'; 
import Footer from './footer';
export const Home = () => {
    const [isMobile] = useMediaQuery("(max-width: 425px)") 

        return ( 
            <> 
            <Hero />
            <Summarizer />
            <Container maxW="container.xl" centerContent mt={isMobile ? "1" : "10"}>
            <Heading fontFamily="system-ui" size={isMobile ? "lg" : "xl"}>
            Eloborate your text using AI
            </Heading> 
          </Container>
            <Eloborator />
            <Footer />
            </>
        );
    
} 
