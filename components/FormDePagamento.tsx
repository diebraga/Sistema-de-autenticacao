import { useState } from 'react'
import PrintObject from '../components/PrintObject'
import { 
  FormControl,
  Input,
  Text,
  Button,
  Spinner,
  Heading,
  Select,
  InputGroup, 
  InputLeftElement,
  createStandaloneToast,
  Link
} from "@chakra-ui/react"
import { fetchPostJSON } from '../utils/api-helpers'
import { formatAmountForDisplay } from '../utils/stripe-helpers'
import * as config from '../config'

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const CARD_OPTIONS = {
  iconStyle: 'solid' as const,
  style: {
    base: {
      iconColor: '#6772e5',
      color: '#6772e5',
      fontWeight: '500',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '19px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#6772e5',
      },
    },
    invalid: {
      iconColor: '#ef2961',
      color: '#ef2961',
    },
  },
}

const FormDePagamento = () => {
  const [input, setInput] = useState({
    valorDoIngresso: 90,
    cardholderName: '',
  })

  const [payment, setPayment] = useState({ status: 'initial' })
  const [errorMessage, setErrorMessage] = useState('')
  const stripe = useStripe()
  const elements = useElements()

  const PaymentStatus = ({ status }: { status: string }) => {
    switch (status) {
      case 'processing':
      case 'requires_payment_method':
      case 'requires_confirmation':
        return <h2>Processando pagamento...</h2>

      case 'requires_action':
        return <h2>Autenticando...</h2>

      case 'succeeded':
        return <h2>Pagamento efetuado com sucesso! 🥳</h2>

      case 'error':
        return (
          <>
            <h2>Erro ao fazer pagamento 😭</h2>
            <small style={{ color: "red" }}>{errorMessage}</small>
          </>
        )

      default:
        return null
    }
  }

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    })

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    // Abort if form isn't valid
    if (!e.currentTarget.reportValidity()) return
    setPayment({ status: 'processing' })

    // Create a PaymentIntent with the specified amount.
    const response = await fetchPostJSON('/api/payment_intents', {
      amount: input.valorDoIngresso,
    })
    setPayment(response)

    if (response.statusCode === 500) {
      setPayment({ status: 'error' })
      setErrorMessage(response.message)
      return
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements!.getElement(CardElement)

    // Use your card Element with other Stripe.js APIs
    const { error, paymentIntent } = await stripe!.confirmCardPayment(
      response.client_secret,
      {
        payment_method: {
          card: cardElement!,
          billing_details: { name: input.cardholderName },
        },
      }
    )

    if (error) {
      setPayment({ status: 'error' })
      setErrorMessage('Porfavor tente novamente.')
    } else if (paymentIntent) {
      setPayment(paymentIntent)
    }

    if (error?.code === "incomplete_zip") {
      setPayment({ status: 'error' })
      setErrorMessage("Seu codigo postal esta incompleto.")
    } else if (paymentIntent) {
      setPayment(paymentIntent)
    }

    if (error?.code === "incomplete_cvc") {
      setPayment({ status: 'error' })
      setErrorMessage("Seu codigo de seguranca esta incompleto.")
    } else if (paymentIntent) {
      setPayment(paymentIntent)
    }

    if (error?.code === "incomplete_expiry") {
      setPayment({ status: 'error' })
      setErrorMessage("Seu codigo de expiração esta incompleto.")
    } else if (paymentIntent) {
      setPayment(paymentIntent)
    }

    if (error?.code === "invalid_number") {
      setPayment({ status: 'error' })
      setErrorMessage("Numero de cartao invalido.")
    } else if (paymentIntent) {
      setPayment(paymentIntent)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <Text as='legend' fontSize={20} mb={3} mt={3}>Detalhes de pagamento:</Text>
          <h1>Valor ingresso 90 RS</h1>
          <Input
            mb={4}
            mt={3}
            placeholder="Nome no cartao"
            type="Text"
            name="cardholderName"
            onChange={handleInputChange}
            required
          />
          <div>
            <CardElement
              options={CARD_OPTIONS}
              onChange={(e) => {
                if (e.error) {
                  setPayment({ status: 'error' })
                }
              }}
            />
          </div>
        </fieldset>
        <Button
          mt={4}
          mb={3}
          colorScheme='teal'
          type="submit"
          disabled={
            !['initial', 'succeeded', 'error'].includes(payment.status) ||
            !stripe
          }
        >
          Pague {formatAmountForDisplay(input.valorDoIngresso, config.CURRENCY)}
        </Button>
      </form>
      <PaymentStatus status={payment.status} />
      <PrintObject content={payment} />
    </>
  )
}

export default FormDePagamento
