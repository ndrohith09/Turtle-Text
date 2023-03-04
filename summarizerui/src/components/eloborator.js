import axios from 'axios';
import React, { Component } from 'react';
import copy from "clipboard-copy";
import { Search } from 'sketch-icons';
import {
    Button, 
    Text ,
    Box,
    InputGroup,
    Input ,
    InputLeftElement,
    Flex,
    Kbd,
    InputRightElement,
    Spacer,  
    CloseButton,
    Alert,
    AlertIcon,
    AlertTitle, 
    Progress, 
    Container, 
  } from '@chakra-ui/react';
  

class Eloborator extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            text : "" ,
            isLoading : false ,
            visible: false,
            copyAlert : false , 
        }
    }


      /**
   *  function to copy value to clipboard
   */
  copyIcon = (e) => {  
    console.log("copy");
    copy(`${this.state.text}`);
    this.setState({
        copyAlert : true
    }) 
  };
 

    urlSubmit = async e => {
        e.preventDefault();
        this.setState({ 
            visible: false,
            isLoading: true, 
            text: '' 
        });

        console.log(this.state.text);
        await axios({
          method: 'post',
          url: 'http://159.89.162.252/generate?txt=' + this.state.text,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => {
            console.log(res.data.text);
            this.setState({ isLoading: false  , visible: true, text : res.data.text });
       
          })
          .catch(error => {
            console.log(error);
            this.setState({ isLoading: false });
          });
      }; 

    render() { 
        return (
            <Container maxW="container.xl" mt="10">
            <form onSubmit={this.urlSubmit}>
            <Flex>
            <InputGroup shadow="xs" size="lg" my="10">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children={<Search width={15} height={15} color="#718096" />}
              />
              <Input
                name="text"
                id="text"
                onChange={e => this.setState({ text: e.target.value })}
                onFocus={this.handleFocus}
                ref={this.searchInput}
                placeholder="Write your text here"
              />
              <InputRightElement width="10.5rem">
                <span>
                  <Kbd>Enter</Kbd>
                </span>
              </InputRightElement>
            </InputGroup>
            <Spacer /> 
          </Flex>
            </form>
            <Spacer />
    
            {this.state.isLoading ? (
              <Progress size="xs" isIndeterminate />
            ) : ( 
              <></>
            )}

 
{this.state.copyAlert ? (
    <Alert status='success'>
    <AlertIcon />
    <Box>
      <AlertTitle>Copied!</AlertTitle> 
    </Box>
    <Spacer />
    <CloseButton
      alignSelf='flex-start'
      position='relative'
      right={-1}
      top={-1}
      onClick={() => this.setState({ copyAlert : false })}
    />
  </Alert>
  
) : (
    <></>
) 
}
{this.state.visible ? (
          <Box shadow="xs" w="100%" borderWidth="1px" borderRadius="md">
            
            <Box w="90%" mx={10} my={5}>
              <Text fontSize="lg">{this.state.text}</Text>
              <Spacer />
              <Button 
                size="sm"
                variant="solid"
                colorScheme="telegram"
                onClick={this.copyIcon}
              >
                Copy
              </Button>
            </Box>
          </Box>
        ) : (
          <></>
        )}
          </Container>
        );
    }
}
 
export default Eloborator;