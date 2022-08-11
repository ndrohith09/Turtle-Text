import React from 'react';
import {
  Container, 
  Heading,
} from '@chakra-ui/react';

export const Hero = () => {
  return (
    <Container maxW="container.xl" centerContent mt="2">
      <Heading fontFamily="system-ui" size="md">
        Summarize video and blogs within seconds
      </Heading>
    </Container>
  );
};
