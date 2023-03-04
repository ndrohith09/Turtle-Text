import * as React from 'react';
import packageJson from 'sketch-icons/package.json';
import { Github, Browser, Security ,Category } from 'sketch-icons';
import {
    Flex,
    Heading,
    Box,
    Spacer,
    Button,
    Image,
    Code,
    Stack,
    LinkOverlay,
    Link,
    Menu,
    IconButton,
    MenuList,
    MenuItem,
    MenuButton,
    useColorModeValue,
} from '@chakra-ui/react'; 
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useMediaQuery } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

export const Nav = () => {
    const { user, logout , loginWithRedirect} = useAuth0();
    
    const iconColor = useColorModeValue('#2A2238', 'white');
    const [isTablet] = useMediaQuery('(max-width: 768px)');

    const menuStyle = {
        fontFamily: 'system-ui',
        color: 'gray.100',
        fontSize: '16px',
    };

    return (
        <Flex as="header" p="5">
            <Box p={2} ml={isTablet ? '2' : '5'}>
                <Stack direction="row" isInline>
                    <Image boxSize={{ base: '40px', md: '45px' }} 
                    objectFit="cover" 
                    src="https://firebasestorage.googleapis.com/v0/b/react-firechat-ae4bf.appspot.com/o/icons8-turtle-48.png?alt=media&token=3ad49069-a9ad-436c-aecc-920fe816909d" 
                    alt="Turtle Text" />
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <Heading fontSize={{ base: '20px', md: '25px', lg: '30px' }} fontFamily="system-ui">
                        Turtle Text &nbsp;
                            <span>
                                <Code>v0.1.1</Code>
                            </span>
                        </Heading>
                    </Link>
                </Stack>
            </Box>
            <Spacer />
            {isTablet ? (
                <Menu>
                    <MenuButton
                        mr="3"
                        as={IconButton}
                        bg="gray.100"
                        aria-label="Options"
                        icon={<Category width={20} height={20} />}
                        variant="outline"
                    />
                    <MenuList>
                         
                        <MenuItem
                            as={Link}
                            isExternal
                            href="https://github.com/garudatechnologydevelopers/Sketch-icons"
                            style={menuStyle}
                            icon={<Github color={iconColor} height="12" width="12" />}
                        >
                            Github
                        </MenuItem>
                        <MenuItem
                            as={Link}
                            isExternal
                            href="https://github.com/garudatechnologydevelopers/Sketch-icons"
                            style={menuStyle}
                            icon={<Security color={iconColor} height="12" width="12" />}
                        >
                             Chrome Extension
                        </MenuItem>
                        
                    </MenuList>
                </Menu>
            ) : (
                <Box> 
                    <Button color="current" leftIcon={<Github color={iconColor} height="14" width="14" />} mr="5">
                        <LinkOverlay isExternal href="https://github.com/garudatechnologydevelopers/Sketch-icons">
                            Github
                        </LinkOverlay>
                    </Button>
                    <Button color="current" leftIcon={<Security color={iconColor} height="14" width="14" />} mr="5">
                        <LinkOverlay
                            isExternal
                            href="https://github.com/garudatechnologydevelopers/Sketch-icons/blob/main/CONTRIBUTING.md"
                        >
                            Chrome Extension
                        </LinkOverlay>
                    </Button>

                    {user === undefined ? 
                    null
                    :
                    <Button color="current" 
                    // leftIcon={<Github color={iconColor} height="14" width="14" />} 
                        mr="5">
                        <LinkOverlay 
                        isExternal  
                        >
                            Hello {user.name}
                        </LinkOverlay>
                    </Button>
                    }
                    
                    {user === undefined ? 
                    <Button color="current" leftIcon={<Github color={iconColor} height="14" width="14" />} mr="5">
                    <LinkOverlay 
                    isExternal 
                    onClick={() => loginWithRedirect()} 
                    >
                        Login
                    </LinkOverlay>
                </Button>
                    :
                    <Button color="current" leftIcon={<Github color={iconColor} height="14" width="14" />} mr="5">
                        <LinkOverlay 
                        isExternal  
                        onClick={() => logout()}
                        >
                            Logout
                        </LinkOverlay>
                    </Button>
}
                    
                </Box>
            )}
            <ColorModeSwitcher mr="5" justifySelf="flex-end" />
        </Flex>
    );
};