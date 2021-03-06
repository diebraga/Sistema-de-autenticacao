import { Flex, Center, Link, Box, createStandaloneToast } from "@chakra-ui/react"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import axios from "axios"
import { FormDeUsuario } from "../components/FormDeUsuario"
import Head from "next/head"

const Register = () => {
  const [events, setEvents] = useState([])

  const toast = createStandaloneToast()

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
      
      <Flex height="100vh" bg="gray.800" color="gray.300" alignItems="center" justifyContent="center">
        <Center width="40%" display={{ base: "none", lg: "block" }} justifyContent="center">
          <Image src="/logo-kosmos.png" height="140px" width="430px"/>
        </Center>
        
        <Box>
          <FormDeUsuario events={events} />
        </Box>
      </Flex>
    </>
  )
}

export default Register
