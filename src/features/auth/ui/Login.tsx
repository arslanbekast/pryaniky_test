import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material'
import { Navigate } from 'react-router'
import { useLogin } from '@/features/auth/hooks/useLogin'

export const Login = () => {
  const { register, handleSubmit, errors, status, isAuthenticated, onSubmit } = useLogin()

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
          <TextField
            error={!!errors.username}
            fullWidth
            label="Имя пользователя"
            margin="normal"
            helperText={errors.username?.message}
            {...register('username')}
          />
          <TextField
            error={!!errors.password}
            fullWidth
            label="Пароль"
            type="password"
            margin="normal"
            helperText={errors.password?.message}
            {...register('password')}
          />
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
