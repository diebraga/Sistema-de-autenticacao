import { 
  Wrap,
  WrapItem,
  Center, 
  Heading,
  FormControl,
  Input,
  FormLabel,
  Button,
  Spinner
} from "@chakra-ui/react"
import { useState } from 'react'
import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import axios from 'axios'

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: ``,
    password: ``,
  });

  const { username, email, password } = formData;

  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
  // Handler for post request
  const onSubmit = (e) => {
    e.preventDefault();

    //  Auth headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    setLoading(true);
    axios
      .post(
        `http://localhost:1337/auth/local/register`,
        { username, email, password },
        config,
      )
      .then(res => {
        setLoading(false);
        window.scrollTo(0, 0);

        setFormData({
          username: '',
          email: ``,      
          password: ``,
        })
      })
      .catch(err => {
        setLoading(false);
        window.scrollTo(0, 0);

      });
    };

  return (
    <Container height="100vh">
      <DarkModeSwitch />
      <Wrap>
        <WrapItem flexDirection="column">
        <Heading mt={10} as='h1' h="100px" size='3xl' bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">SignUp Page</Heading>
          <Center mt={4}>
            <FormControl isRequired>
              <FormLabel>Nome</FormLabel>
              <Input 
                variant="filled" 
                w="358px" 
                placeholder="Nome"
                name="username"
                onChange={e => onChange(e)}/>
              <FormLabel mt={2}>Email</FormLabel>
              <Input 
                variant="filled" 
                w="358px" 
                placeholder="Email"
                name="email"
                onChange={e => onChange(e)}/>
              <FormLabel mt={2}>Senha</FormLabel>
              <Input 
                variant="filled" 
                w="358px" 
                placeholder="Senha" 
                name="password"
                mb={4} 
                onChange={e => onChange(e)}/>
              <br />
              {loading ? (
                <Spinner color="red.500" />
              ) : (
                <Button type="submit" onClick={e => onSubmit(e)}>SignUp</Button>
              )}
            </FormControl>
          </Center>
        </WrapItem>
      </Wrap>
    </Container>
  )
}


export const getServerSideProps = async () => {
  
  return {
    props: {
    }
  }
}

export default SignUp
