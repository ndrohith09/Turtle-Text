import React from 'react';
import Eloborator from './eloborator';
import { Hero } from './hero';
import Summarizer from './summarizer';
import { Text, useColorModeValue, Container, Heading } from '@chakra-ui/react';
export const Home = () => {
  const textColor = useColorModeValue('gray.600', 'gray.600');
  return (
    <>
      <Hero />
      <Summarizer />
      <Container maxW="container.xl" centerContent mt="10">
        <Heading fontFamily="system-ui" size="md">
          Eloborate your text using AI
        </Heading>
      </Container>
      <Eloborator />
      <Container centerContent mt="10">
        <Text fontSize="sm" color={textColor}>
          Proudly built with ❤️ in India
        </Text>
      </Container>
    </>
  );
};
