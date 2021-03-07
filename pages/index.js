import { Wrap, WrapItem, Center } from "@chakra-ui/react"
import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import getConfig from 'next/config'

const Index = () => {

  return (
    <Container height="100vh">
      <DarkModeSwitch />
      <Wrap>
        <WrapItem>
          <Center w="180px" h="80px" bgGradient="linear(to-l, #7928CA, #FF0080)">
            Box 1
          </Center>
        </WrapItem>
        <WrapItem>
          <Center w="180px" h="80px" bg="green.200">
            Box 2
          </Center>
        </WrapItem>
        <WrapItem>
          <Center w="180px" h="80px" bg="tomato">
            Box 3
          </Center>
        </WrapItem>
        <WrapItem>
          <Center w="180px" h="80px" bg="blue.200">
            Box 4
          </Center>
        </WrapItem>
      </Wrap>
    </Container>
  )
}

const { publicRuntimeConfig } = getConfig()

export const getServerSideProps = async () => {
  
  return {
    props: {
    }
  }
}

export default Index
