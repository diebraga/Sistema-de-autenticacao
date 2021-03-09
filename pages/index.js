import { 
  Wrap,
  WrapItem,
  Center, 
  Heading,
  FormControl,
  Input,
  FormLabel,
  Button,
  Spinner,
  createStandaloneToast,
} from "@chakra-ui/react"
import { WarningTwoIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'


const SignUp = () => {
  const { register, errors, handleSubmit, watch } = useForm({
    mode: "onBlur"
  })  

  const toast = createStandaloneToast()

  return (
    <Wrap spacing="30px" justify="center">
      <FormControl w={[300, 400, 560]}>
        <form onSubmit={handleSubmit(async(formData) => {

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

          console.log(data, "server data")
  
        })}>
          <WrapItem flexDirection="column" alignSelf="center">
            <FormLabel mt={8} htmlFor="username">Nome</FormLabel>
            <Input name="username" placeholder="Nome"  id="username" ref={register({
              required: "Nome obrigatorio"
            })}/>
            {errors.username ?(<p style={{ color: "red", fontWeight: "400" }}> <WarningTwoIcon /> {errors.username.message}.</p>) : null}
          </WrapItem>
          <WrapItem flexDirection="column">
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input name="email" placeholder="Email" id="email" ref={register({
              required: "Email obrigatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email invalido"
              }    
            })}/>
            {errors.email ?(<p style={{ color: "red", fontWeight: "400" }}> <WarningTwoIcon /> {errors.email.message}.</p>) : null}
          </WrapItem>
          <WrapItem flexDirection="column">
            <FormLabel htmlFor="password">Senha</FormLabel>
            <Input name="password" placeholder="Senha" id="password" ref={register({
              required: "Senha obrigatoria",
              minLength: {
                value: 4,
                message: "Digite pelo menos 4 caracteres"
              }
            })}/>
            {errors.password ?(<p style={{ color: "red", fontWeight: "400" }}> <WarningTwoIcon /> {errors.password.message}.</p>) : null}
          </WrapItem>
          <WrapItem flexDirection="column">
            <FormLabel htmlFor="password2">Repetir senha</FormLabel>
            <Input name="password2" placeholder="Senha" id="password2" ref={register({
              required: "Repetir senha obrigatorio",
              validate: (value) => value === watch('password') || "Senhas nao compativeis."
            })}/>
            {errors.password2 ?(<p style={{ color: "red", fontWeight: "400" }}> <WarningTwoIcon /> {errors.password2.message}.</p>) : null}
          </WrapItem>
            <Button type="submit">SignUp</Button>
        </form>
      </FormControl>
    </Wrap>
  )
}

export default SignUp
