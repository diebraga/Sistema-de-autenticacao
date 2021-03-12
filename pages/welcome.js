import { 
  Box,
  Input,
  FormLabel,
  Button,
  Spinner,
  Heading,
  Select,
  createStandaloneToast,
  Flex,
  Center,
  InputGroup, 
  InputLeftElement
} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { MdCheckCircle } from 'react-icons/md';

const Success = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 100);
  });

  return (
    <>
    <Box height="100vh" bg="gray.800" color="gray.300" alignItems="center" textAlign="center">
      <Confetti width={width} height={height} numberOfPieces={450} />
      <Center >
        <MdCheckCircle style={{ marginTop: "102px", color: "green" }} size={200}  />
      </Center>
      <Center mt={20}>
        <Heading>Bem Vindo a Kosmos Brasil !!!</Heading>
      </Center>
    </Box>
    </>
  );
}; 
 
export default Success;
