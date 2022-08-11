import React, { Component } from 'react';
import { Search } from 'sketch-icons';
import axios from 'axios';
import copy from 'clipboard-copy';
import {
  Button,
  InputGroup,
  Text,
  Box,
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
  Input,
  Container,
} from '@chakra-ui/react';

 
class Summarizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      summary: '',
      isLoading: false,
      visible: false,
      copyAlert: false,
    };
  }
 
  copyIcon = e => {
    console.log('copy');
    copy(`${this.state.summary}`);
    this.setState({
      copyAlert: true,
    });
  };

  urlSubmit = async e => {
    e.preventDefault();
    this.setState({
      visible: false,
      isLoading: true,
      summary: '',
    });
    console.log(this.state.url);
    await axios({
      method: 'post',
      url: 'http://192.168.1.11:8000/predict?url=' + this.state.url,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        console.log(res);
        this.setState({
          isLoading: false,
          visible: true,
          summary: res.data['summarized_text'],
        });
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
            <InputGroup shadow="xs" size="md">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1em"
                children={<Search width={10} height={10} color="#718096" />}
              />
              <Input
                name="url"
                id="url"
                onChange={e => this.setState({ url: e.target.value })}
                onFocus={this.handleFocus}
                ref={this.searchInput}
                placeholder="Enter youtube video url or blog url"
              />
              <InputRightElement width="10rem">
                <span>
                  <Kbd>Enter</Kbd>
                </span>
              </InputRightElement>
            </InputGroup>
            <Spacer />
          </Flex>
        </form>
        <Spacer />

        {this.state.copyAlert ? (
          <Alert status="success">
            <AlertIcon />
            <Box>
              <AlertTitle>Copied!</AlertTitle>
            </Box>
            <Spacer />
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={() => this.setState({ copyAlert: false })}
            />
          </Alert>
        ) : (
          <></>
        )}
        {this.state.isLoading ? <Progress size="xs" isIndeterminate /> : <></>}

        {this.state.visible ? (
          <Box shadow="xs" w="100%" borderWidth="1px" borderRadius="md">
            <Box w="90%" mx={8} my={3}>
              <Text fontSize="md">{this.state.summary}</Text>
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

export default Summarizer;
