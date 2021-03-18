import { useState } from 'react'
import { 
  Flex,
  Center, 
  FormControl, 
  Input, 
  Button, 
  createStandaloneToast,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Heading,
  Spinner,
  Box,
  Link
} from "@chakra-ui/react"
import Router from 'next/router'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { WarningIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons'
import Head from "next/head"
import { useRouter } from 'next/router'
import axios from 'axios';
import NextLink from 'next/link'


const ResetPassword = () => {
  const { register, errors, handleSubmit, watch } = useForm({
    mode: "all"
  })  

  const router = useRouter()
  const {code} = router.query
  
  const [submitting, setSubmitting] = useState(false)

  const toast = createStandaloneToast()

  return (
    <Flex height="100vh" bg="gray.800" color="gray.300" alignItems="center" justifyContent="center">
      <Center width="40%" display={{ base: "none", lg: "block" }} justifyContent="center">
        <Image src="/logo-kosmos.png" height="140px" width="430px"/>
      </Center>
      <Box>
        <FormControl w={[300, 400, 500]}>
          <form onSubmit={handleSubmit(async(formData) => {
            setSubmitting(true)
            axios
            .post('http://localhost:1337/auth/reset-password', {
              code: code,
              password: formData.password,
              passwordConfirmation: formData.password2,
            })
            .then(response => {
              Router.push("/login")
                toast({
                  title: "Sua senha foi renovada com sucesso.",
                  description: "Por favor login com sua nova senha.",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                  position: "top"
                })          
            })
            .catch(error => {
              console.log('An error occurred:', error.response);
              toast({
                title: "Error ao recuperar senha.",
                description: "Por favor tente novamente.",
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "top"
              })      
              setSubmitting(false)    
            });
                      
            
          })}>
          <Head>
            <title>Esqueci minha senha | Kosmos</title>
          </Head>

          <Heading as="h1">Escolha sua nova senha. 🚀</Heading>
          <FormLabel mt={1} htmlFor="password">Senha</FormLabel>
        <InputGroup flexDirection="column">
        <InputLeftElement pointerEvents="none" children={<LockIcon />}/>
          <Input variant="filled" type="password" name="password" placeholder="Senha" id="password" ref={register({
            required: "Senha obrigatoria",
            minLength: {
              value: 4,
              message: "Digite pelo menos 4 caracteres"
            }
          })}/>
          {errors.password ?(<small style={{ color: "red" }}> <WarningIcon /> {errors.password.message}.</small>) : null}
        </InputGroup>
        <FormLabel mt={1} htmlFor="password2">Repetir senha</FormLabel>
        <InputGroup flexDirection="column">
        <InputLeftElement pointerEvents="none" children={<UnlockIcon />}/>
          <Input variant="filled" type="password" name="password2" placeholder="Repetir senha" id="password2" ref={register({
            required: "Repetir senha obrigatorio",
            validate: (value) => value === watch('password') || "Senhas nao compativeis."
          })}/>
          {errors.password2 ?(<small style={{ color: "red" }}> <WarningIcon /> {errors.password2.message}.</small>) : null}
        </InputGroup>
          {submitting ? <Spinner color="blue.500" size="lg" mt={3} /> : <Button mt={3} type="submit">Enviar</Button>}
          </form>
        </FormControl>
        <br />
        <NextLink href="/login">
          <Link color="blue.300">Login. ➔</Link>
        </NextLink>
      </Box>
    </Flex>
  )
}

export default ResetPassword
