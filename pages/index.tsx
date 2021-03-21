import { Flex, Center } from "@chakra-ui/react"
import BabylonNext from '../components/BabylonNext'
import ExampleContainer from "../containers/Example-02-container"

const Index = () => {
  return (
    <Flex height="100vh" bg="gray.800" color="gray.300" alignItems="center" justifyContent="center">
      <ExampleContainer />
    </Flex>
  )
}


export default Index
