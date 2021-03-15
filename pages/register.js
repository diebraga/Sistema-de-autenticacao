import { Flex, Center } from "@chakra-ui/react"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import axios from "axios"
import { RegisterForm } from "../components/RegisterForm"


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
    <Flex height="100vh" bg="gray.800" color="gray.300" alignItems="center" justifyContent="center">
      <Center width="45%" display={{ base: "none", lg: "block" }} justifyContent="center">
        <Image src="/logo-kosmos.png" height="140px" width="430px"/>
      </Center>
      <RegisterForm events={events} />
    </Flex>
  )
}

export default Register
