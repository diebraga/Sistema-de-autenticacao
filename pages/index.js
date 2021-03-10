import { 
  Wrap,
  WrapItem,
  Progress, 
  FormControl,
  Input,
  FormLabel,
  Button,
  Spinner,
  Heading,
  Select,
  createStandaloneToast,
} from "@chakra-ui/react"
import { WarningTwoIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from "axios"


const SignUp = () => {
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

  const [submitting, setSubmitting] = useState(false)

  const toast = createStandaloneToast()

  return (
    <>
    {formStep === 0 && <Progress size="sm" hasStripe value={10} />}

    <Wrap bg="gray.800" height="100vh" color="gray.100" spacing="30px" justify="center">
      <FormControl w={[300, 400, 600]}>
        <form onSubmit={handleSubmit(async(formData) => {
          setSubmitting(true)
          const response = await fetch(`http://localhost:1337/auth/local/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: formData.username,
              email: formData.email,
              password: formData.password,
              password2: formData.password2,
              eventos: [formData.eventos]
            })
          })

          const data = await response.json()
          
          if (data.error) {
            toast({
              title: "Erro criando conta.",
              description: "Por favor tente novamente.",
              status: "error",
              duration: 9000,
              isClosable: true,
            })    
          } else {
            window.alert("success")
          }

          setSubmitting(false)
        })}>

          {/* Primeiro passo */}
          {formStep === 0 && (
            <>
            <WrapItem flexDirection="column" alignSelf="center">
              <Heading as="h1" mt={10}>Passo 1</Heading>
              <FormLabel mt={8} htmlFor="username">Nome</FormLabel>
              <Input variant="filled" name="username" placeholder="Nome"  id="username" ref={register({
                required: "Nome obrigatorio"
              })}/>
              {errors.username ?(<small style={{ color: "red", fontWeight: "400" }}> <WarningTwoIcon /> {errors.username.message}.</small>) : null}
            </WrapItem>
            <WrapItem flexDirection="column">
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input variant="filled" name="email" placeholder="Email" id="email" ref={register({
                required: "Email obrigatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email invalido"
                }    
              })}/>
              {errors.email ?(<small style={{ color: "red", fontWeight: "400" }}> <WarningTwoIcon /> {errors.email.message}.</small>) : null}
            </WrapItem>
            <WrapItem flexDirection="column">
              <FormLabel htmlFor="password">Senha</FormLabel>
              <Input variant="filled" name="password" placeholder="Senha" id="password" ref={register({
                required: "Senha obrigatoria",
                minLength: {
                  value: 4,
                  message: "Digite pelo menos 4 caracteres"
                }
              })}/>
              {errors.password ?(<small style={{ color: "red", fontWeight: "400" }}> <WarningTwoIcon /> {errors.password.message}.</small>) : null}
            </WrapItem>
            <WrapItem flexDirection="column">
              <FormLabel htmlFor="password2">Repetir senha</FormLabel>
              <Input variant="filled" name="password2" placeholder="Senha" id="password2" ref={register({
                required: "Repetir senha obrigatorio",
                validate: (value) => value === watch('password') || "Senhas nao compativeis."
              })}/>
              {errors.password2 ?(<small style={{ color: "red", fontWeight: "400" }}> <WarningTwoIcon /> {errors.password2.message}.</small>) : null}
            </WrapItem>
            <WrapItem flexDirection="column">
              <FormLabel htmlFor="password2">Eventos</FormLabel>
              <Select variant="filled" color="gray.400" name="eventos" id="eventos" placeholder="Select option" ref={register({
                required: "Evento obrigatorio",
              })}>
                {events.map((item)=>{
                  return (
                    <div key={item.id}>{item.nome}</div>
                  )
                })}
              </Select>        
              {errors.eventos &&(<small style={{ color: "red", fontWeight: "400" }}> <WarningTwoIcon /> {errors.eventos.message}.</small>)}    
            </WrapItem>
            <Button mt={3} type="button" onClick={nextStepForm}>Proximo</Button>
          </>
          )}
            {submitting ? <Spinner color="blue.500" size="lg" mt={3} /> : <Button mt={3} type="submit">Submit</Button>}
        </form>
      </FormControl>
    </Wrap>
    </>
  )
}

export default SignUp
