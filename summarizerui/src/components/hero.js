import React from 'react';
import { Container, useMediaQuery ,Heading, HStack, Button, Link } from "@chakra-ui/react";

export const Hero = () => {
 
        const [isMobile] = useMediaQuery("(max-width: 425px)") 

        return ( 
            <Container maxW="container.xl" centerContent mt={isMobile ? "1" : "10"}>
            <Heading fontFamily="system-ui" size={isMobile ? "lg" : "xl"}>
            Summarize video and blogs within seconds
            </Heading> 
          </Container>
        );
    
} 
