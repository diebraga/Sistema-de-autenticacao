import { 
  FormControl,
  Input,
  FormLabel,
  Button,
  Spinner,
  Heading,
  InputGroup, 
  InputLeftElement,
  createStandaloneToast,
  Link,
  Stack,
  RadioGroup,
  Radio
} from "@chakra-ui/react"
import { WarningIcon, EmailIcon, CalendarIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons'
import { FaUser } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { useState, useRef } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import getStripe from '../utils/get-stripe'
import FormDePagamento from '../components/FormDePagamento'
import NextLink from 'next/link'

export const FormDeUsuario = (props) => {
  const { register, errors, handleSubmit, watch, reset } = useForm({
    mode: "all"
  })  

  const nameIsFilled = watch('username')
  const emailIsFilled = watch('email')
  const passwordIsFilled = watch('password')
  const password2IsFilled = watch('password2')

  const isParticipante = watch('participante')
  const isOrganizador = watch('organizador')
  const isPalestrante = watch('palestrante')

  const [submitting, setSubmitting] = useState(false)
  const [formStep, setFormStep] = useState(0)

  const toast = createStandaloneToast()

  return (
    <>
    <FormControl w={[300, 400, 500]}>
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
      reset()
    })}>
      <>
        {formStep === 0 && (
        <>
        <Heading as="h1">Fa??a seu cadastro ????</Heading>
        
        {isParticipante && (
          setFormStep(cur => cur + 1)
        )}

        {isPalestrante && (
          setFormStep(cur => cur + 2)
        )}

        {isOrganizador && (
          setFormStep(cur => cur + 3)
        )}

        <InputGroup flexDirection="column">
          <FormLabel mt={3} htmlFor="participante">
          <input type="radio" name="participante" id="participante" ref={register()} placeholder='Participante'/>&nbsp;
            Sou Participante
          </FormLabel>
          <FormLabel mt={3} htmlFor="palestrante">
          <input type="radio" name="palestrante" id="palestrante" ref={register()} placeholder='Participante'/>&nbsp;
            Sou Palestrante
          </FormLabel>
          <FormLabel mt={3} htmlFor="organizador">
          <input type="radio" name="organizador" id="organizador" ref={register()} placeholder='Participante'/>&nbsp;
            Sou Organizador
          </FormLabel>
        </InputGroup>

        <FormLabel mt={3} htmlFor="username">Nome</FormLabel>
        <InputGroup flexDirection="column">
          <InputLeftElement pointerEvents="none" children={<FaUser />}/>
          <Input variant="filled" type="name" name="username" placeholder="Nome" id="username" ref={register({
            required: "Nome obrigatorio"
          })}/>
          {errors.username ?(<small style={{ color: "red" }}> <WarningIcon /> {errors.username.message}.</small>) : null}
        </InputGroup>
        <FormLabel mt={1} htmlFor="email">Email</FormLabel>
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
            minLength: {
              value: 4,
              message: "Digite pelo menos 4 caracteres"
            }
          })}/>
          {errors.password ?(<small style={{ color: "red" }}> <WarningIcon /> {errors.password.message}.</small>) : null}
        </InputGroup>
        <FormLabel mt={1} htmlFor="password2">Repetir senha</FormLabel>
        <InputGroup flexDirection="column">
        <InputLeftElement pointerEvents="none" children={<UnlockIcon />}/>
          <Input variant="filled" type="password" name="password2" placeholder="Repetir senha" id="password2" ref={register({
            required: "Repetir senha obrigatorio",
            validate: (value) => value === watch('password') || "Senhas nao compativeis."
          })} />
          {errors.password2 ?(<small style={{ color: "red" }}> <WarningIcon /> {errors.password2.message}.</small>) : null}
        </InputGroup>
        
        {errors.username ||
         errors.email ||
         errors.password ||
         errors.password2 ||
         !nameIsFilled ||
         !emailIsFilled || 
         !password2IsFilled ||
         !passwordIsFilled
          ?  <Button 
          type='button' 
          mt={3} 
          mb={3} 
          colorScheme='teal' 
          disabled
          >
          Pr??ximo passo
        </Button>
          : (
        <Button 
          type='button' 
          mt={3} 
          mb={3} 
          colorScheme='teal' 
          >
          Pr??ximo passo
        </Button>
        )
        }

          <br/>
          <NextLink href="/login">
            <Link color="blue.300">Ja tenho uma conta. ???</Link>
          </NextLink>
          <br />
        </>
        )}

        {formStep === 2 && (
        <InputGroup>
          {submitting ? <Spinner color="blue.500" size="lg" mt={3} /> : <Button colorScheme='teal' mt={3} type="submit">
            Finalizar cadastro.
          </Button>}
        </InputGroup>
        )}
      </>
    </form>
    </FormControl>

    {formStep === 1 && (
      <div>
        <Heading as='h1'>Pagamento ingresso na plataforma</Heading>
        <Elements stripe={getStripe()}>
          <FormDePagamento prossimoPassoButton={(
            <Button type='button' mt={3} mb={3} colorScheme='teal'>
              Pr??ximo passo
            </Button>
          )}/>
        </Elements>
      </div>
    )}
  </>
  )
}