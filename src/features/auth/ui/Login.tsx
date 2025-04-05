import { Box, Button, CircularProgress, Container, Typography } from '@mui/material'
import { Navigate } from 'react-router'
import { useLogin } from '@/features/auth/hooks/useLogin'
import { ControlledTextField } from '@/common/components/ControlledTextField'

export const Login = () => {
  const { handleSubmit, control, status, isAuthenticated, onSubmit } = useLogin()

  if (isAuthenticated) {
    return <Navigate to={'/'} />
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Вход в систему
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextField name="username" control={control} label="Имя пользователя" />
          <ControlledTextField name="password" type={'password'} control={control} label="Пароль" />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={status === 'loading'}
            type="submit"
          >
            {status === 'loading' ? <CircularProgress size={24} /> : 'Войти'}
          </Button>
        </form>
      </Box>
    </Container>
  )
}
