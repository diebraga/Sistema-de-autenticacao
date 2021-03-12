import { 
  FormControl,
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
import Image from 'next/image'
import { WarningIcon, EmailIcon, CalendarIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons'
import { FaUser } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from "axios"


const Register = () => {
  const { register, errors, handleSubmit, watch } = useForm({
    mode: "all"
  })  

  const [formStep, setFormStep] = useState(0)

  const nextStepForm = () => {
    setFormStep(cur => cur + 1)
  }

  const backStepForm = () => {
    setFormStep(cur => cur - 1)
  }

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
    try {
      const response = await axios.get(`https://kosmos-admin.herokuapp.com/eventos`);
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

  const [submitting, setSubmitting] = useState(false)

  const toast = createStandaloneToast()

  return (
    <>
    <Flex height="100vh" bg="gray.800" color="gray.300" alignItems="center" justifyContent="center">
      <Center width="45%" display={{ base: "none", lg: "block" }} justifyContent="center">
        <Image src="/logo-kosmos.png" height="200px" width="540px"/>
      </Center>
      <FormControl w={[300, 400, 600]}>
        <form onSubmit={handleSubmit(async(formData) => {
          setSubmitting(true)
          const response = await fetch(`https://kosmos-admin.herokuapp.com/auth/local/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: formData.username,
              email: formData.email,
              password: formData.password,
              password2: formData.password2,
              eventos: [formData.eventos],
            })
          })

          const data = await response.json()

          console.log(data, "server data")
          
          if (data.error) {
            toast({
              title: "Erro criando conta.",
              description: "Por favor tente novamente.",
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "top"
            })    
          } else {
            toast({
              title: "Conta criada com sucesso!.",
              description: `Por favor verifique em seu email e "caixa de spam".`,
              status: "success",
              duration: 9000,
              isClosable: true,
              position: "top"
            })    
          }

          setSubmitting(false)
        })}>
            <>
            <Heading as="h1" mt={10}>Faça seu cadastro 🚀</Heading>
            <FormLabel mt={8} htmlFor="username">Nome</FormLabel>
            <InputGroup flexDirection="column">
              <InputLeftElement pointerEvents="none" children={<FaUser />}/>
              <Input variant="filled" type="text" name="username" placeholder="Nome" id="username" ref={register({
                required: "Nome obrigatorio"
              })}/>
              {errors.username ?(<small style={{ color: "red", fontWeight: "400" }}> <WarningIcon /> {errors.username.message}.</small>) : null}
            </InputGroup>
            <FormLabel mt={2} htmlFor="email">Email</FormLabel>
            <InputGroup flexDirection="column">
            <InputLeftElement pointerEvents="none" children={<EmailIcon />}/>
              <Input variant="filled" name="email" type="email" placeholder="Email" id="email" ref={register({
                required: "Email obrigatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email invalido"
                }    
              })}/>
              {errors.email ?(<small style={{ color: "red", fontWeight: "400" }}> <WarningIcon /> {errors.email.message}.</small>) : null}
            </InputGroup>
            <FormLabel mt={2} htmlFor="password">Senha</FormLabel>
            <InputGroup flexDirection="column">
            <InputLeftElement pointerEvents="none" children={<LockIcon />}/>
              <Input variant="filled" type="password" name="password" placeholder="Senha" id="password" ref={register({
                required: "Senha obrigatoria",
                minLength: {
                  value: 4,
                  message: "Digite pelo menos 4 caracteres"
                }
              })}/>
              {errors.password ?(<small style={{ color: "red", fontWeight: "400" }}> <WarningIcon /> {errors.password.message}.</small>) : null}
            </InputGroup>
            <FormLabel mt={2} htmlFor="password2">Repetir senha</FormLabel>
            <InputGroup flexDirection="column">
            <InputLeftElement pointerEvents="none" children={<UnlockIcon />}/>
              <Input variant="filled" type="password" name="password2" placeholder="Senha" id="password2" ref={register({
                required: "Repetir senha obrigatorio",
                validate: (value) => value === watch('password') || "Senhas nao compativeis."
              })}/>
              {errors.password2 ?(<small style={{ color: "red", fontWeight: "400" }}> <WarningIcon /> {errors.password2.message}.</small>) : null}
            </InputGroup>
            <FormLabel mt={2} htmlFor="eventos">Eventos</FormLabel>
            <InputGroup flexDirection="column">
            <InputLeftElement pointerEvents="none" children={<CalendarIcon />}/>
              <Select variant="filled" color="gray.400" name="eventos" id="eventos" placeholder="&nbsp;&nbsp; &nbsp; Selecione evento" ref={register({
                required: "Evento obrigatorio",
              })}>
                {events.map((item)=>{
                  return (
                    <option value={item.id} key={item.id}>&nbsp;&nbsp; &nbsp; {item.nome}</option>
                  )
                })}
              </Select>        
              {errors.eventos &&(<small style={{ color: "red", fontWeight: "400" }}> <WarningIcon /> {errors.eventos.message}.</small>)}    
            </InputGroup>
            <InputGroup>
            {submitting ? <Spinner color="blue.500" size="lg" mt={3} /> : <Button mt={3} type="submit">Submit</Button>}
            </InputGroup>
          </>
        </form>
      </FormControl>
    </Flex>
    </>
  )
}

export default Register
