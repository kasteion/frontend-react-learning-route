import React from 'react'
import { useInputValue } from '../../hooks/useInputValue'
import { Form, Input, Title, Error } from './styles'
import { SubmitButton } from '../SubmitButton'

export const UserForm = ({ title, onSubmit, error, disabled }) => {
  const email = useInputValue('')
  const password = useInputValue('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ email: email.value, password: password.value })
  }

  return (
    <>
      <Title>{title}</Title>
      <Form disabled={disabled} onSubmit={handleSubmit}>
        <Input disabled={disabled} placeholder='Email' {...email} />
        <Input disabled={disabled} type='password' {...password} />
        <SubmitButton disabled={disabled}>{title}</SubmitButton>
      </Form>
      <Error>{error}</Error>
    </>
  )
}
