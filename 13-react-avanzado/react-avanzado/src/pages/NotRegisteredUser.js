import React, { useContext } from 'react'
import { Context } from '../Context'
import { UserForm } from '../components/UserForm'
import { RegisterMutation } from '../containers/RegisterMutation'
import { LoginMutation } from '../containers/LoginMutation'

export const NotRegisteredUser = () => {
  const { activateAuth } = useContext(Context)

  return (
    <>
      <RegisterMutation>
        {
          (register, { loading, error }) => {
            const onSubmit = ({ email, password }) => {
              const input = { email, password }
              const variables = { input }
              register({ variables })
                .then(({ data }) => {
                  const { signup } = data
                  activateAuth(signup)
                })
                .catch(() => {})
            }
            const errorMsg = error && 'El usuario ya existe o hay algún problema.'
            return <UserForm disabled={loading} error={errorMsg} title='Registrarse' onSubmit={onSubmit} />
          }
        }
      </RegisterMutation>
      <LoginMutation>
        {
          (login, { loading, error }) => {
            const onSubmit = ({ email, password }) => {
              const input = { email, password }
              const variables = { input }
              login({ variables })
                .then(({ data }) => {
                  const { login } = data
                  activateAuth(login)
                })
                .catch(() => {})
            }
            const errorMsg = error && 'La contraseña no es correcta o el usuario no exite.'
            return <UserForm disabled={loading} error={errorMsg} title='Iniciar Sesión' onSubmit={onSubmit} />
          }
        }
      </LoginMutation>
    </>
  )
}
