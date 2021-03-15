import { Flex, Center, Link } from "@chakra-ui/react"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import axios from "axios"
import { RegisterForm } from "../components/RegisterForm"
import Head from "next/head"
import NextLink from 'next/link'


const Register = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/eventos`);
      setEvents(response.data);
    }
    catch (err) {
      toast({
        title: "Erro carregando eventos.",
        status: "error",
        duration: 9000,
        isClosable: true,
      })    
    }
  }
    fetchPost();
  }, []);


  return (
    <>
      <Head>
        <title>Cadastro | Kosmos</title>
      </Head>
      <Flex height="100vh" bg="gray.800" color="gray.300" alignItems="center" justifyContent="center" flexDirection="column">
        <Center width="45%" display={{ base: "none", lg: "block" }} justifyContent="center">
          <Image src="/logo-kosmos.png" height="140px" width="430px"/>
        </Center>
        <RegisterForm events={events} />
        <NextLink href="/login">
          <Link mt={3} color="blue.300">Ja tenho uma conta. ➔</Link>
        </NextLink>
      </Flex>
    </>
  )
}

export default Register
