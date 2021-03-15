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
  Link,
  Box
} from "@chakra-ui/react"
import Router from 'next/router'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { WarningIcon, EmailIcon } from '@chakra-ui/icons'
import Head from "next/head"
import NextLink from 'next/link'


const ForgotPassword = () => {
  const { register, errors, handleSubmit } = useForm({
    mode: "all"
  })  

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
            const response = await fetch(`http://localhost:1337/auth/forgot-password`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                email: formData.email,
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
            
              Router.push('/login')
              .then(
                toast({
                  title: "Verifique em seu email.",
                  description: "Por favor verifique em seu email.",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                  position: "top"
                })          
              )
            }
            
            setSubmitting(false)
          })}>
          <Head>
            <title>Recuperar minha senha | Kosmos</title>
          </Head>

          <Heading as="h1">Recupere sua senha 🚀</Heading>
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

export default ForgotPassword
