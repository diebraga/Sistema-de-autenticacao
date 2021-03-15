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
  Link
} from "@chakra-ui/react"
import { setCookie } from 'nookies'
import Router from 'next/router'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { WarningIcon, EmailIcon, LockIcon } from '@chakra-ui/icons'
import Head from "next/head"
import NextLink from 'next/link'


const Login = () => {
  const { register, errors, handleSubmit } = useForm({
    mode: "all"
  })  

  const [submitting, setSubmitting] = useState(false)

  const toast = createStandaloneToast()

  return (
    <Flex height="100vh" bg="gray.800" color="gray.300" alignItems="center" justifyContent="center" flexDirection="column">
      <Center width="45%" display={{ base: "none", lg: "block" }} justifyContent="center">
        <Image src="/logo-kosmos.png" height="140px" width="430px"/>
      </Center>
      <FormControl w={[300, 400, 500]}>
        <form onSubmit={handleSubmit(async(formData) => {
          setSubmitting(true)
          const response = await fetch(`http://localhost:1337/auth/local`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              identifier: formData.email,
              password: formData.password,
            })
          })

          const data = await response.json()

          console.log(data, "server data")

          if (data.error) {
            toast({
              title: "Erro de authenticacao.",
              description: "Por favor tente novamente.",
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "top"
            })        
          } else {
            setCookie(null, 'jwt', data.jwt , {
              maxAge: 30 * 24 * 60 * 60,
              path: '/',
            })
          
            Router.push('/')  
          }
          
          setSubmitting(false)
        })}>
        <Head>
          <title>Login | Kosmos</title>
        </Head>

        <Heading as="h1">Faca seu login 🚀</Heading>
        <FormLabel mt={5} htmlFor="email">Email</FormLabel>
        <InputGroup flexDirection="column">
        <InputLeftElement pointerEvents="none" children={<EmailIcon />}/>
          <Input variant="filled" name="email" type="email" placeholder="Email" id="email" ref={register({
            required: "Email obrigatorio",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email invalido"
            }    
          })}/>
          {errors.email ?(<small style={{ color: "red" }}> <WarningIcon /> {errors.email.message}.</small>) : null}
        </InputGroup>
        <FormLabel mt={1} htmlFor="password">Senha</FormLabel>
        <InputGroup flexDirection="column">
        <InputLeftElement pointerEvents="none" children={<LockIcon />}/>
          <Input variant="filled" type="password" name="password" placeholder="Senha" id="password" ref={register({
            required: "Senha obrigatoria",
          })}/>
          {errors.password ?(<small style={{ color: "red" }}> <WarningIcon /> {errors.password.message}.</small>) : null}
        </InputGroup>
        {submitting ? <Spinner color="blue.500" size="lg" mt={3} /> : <Button mt={3} type="submit">Enviar</Button>}
        </form>
      </FormControl>
      <NextLink href="/register">
        <Link mt={3} color="blue.300">ainda nao tenho uma conta. ➔</Link>
      </NextLink>
    </Flex>
  )
}

export default Login
