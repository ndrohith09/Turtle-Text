import * as React from 'react';
import {
  Flex,
  Heading,
  Box,
  Spacer, 
  Image,
  Code,
  Stack, 
  Link, 
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useMediaQuery } from '@chakra-ui/react';
export const Nav = () => {
 
  const [isTablet] = useMediaQuery('(max-width: 768px)');

  

  return (
    <Flex as="header" p="5">
      <Box p={2} ml={isTablet ? '2' : '5'}>
        <Stack direction="row" isInline>
          <Image
            boxSize={{ base: '30px', md: '28px' }}
            objectFit="cover"
            src="https://firebasestorage.googleapis.com/v0/b/react-firechat-ae4bf.appspot.com/o/icons8-turtle-48.png?alt=media&token=3ad49069-a9ad-436c-aecc-920fe816909d"
            alt="Turtle Text"
          />
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Heading fontSize="18px" fontFamily="system-ui">
              Turtle Text &nbsp;
              <span>
                <Code>v0.1.1</Code>
              </span>
            </Heading>
          </Link>
        </Stack>
      </Box>
      <Spacer />
      <ColorModeSwitcher mr="5" justifySelf="flex-end" />
    </Flex>
  );
};
