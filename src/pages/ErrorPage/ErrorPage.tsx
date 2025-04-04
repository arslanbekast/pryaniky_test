import { Container, Typography, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

export const ErrorPage = ({ message = 'Что-то пошло не так!', statusCode = 404 }) => {
  const navigate = useNavigate()

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 80 }} />
        <Typography variant="h4" color="error">
          Ошибка {statusCode}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {message}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          На главную
        </Button>
      </Box>
    </Container>
  )
}
