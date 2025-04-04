import { Container, AppBar, Toolbar, Typography, Button, LinearProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/features/auth/model/authSlice'
import { useNavigate } from 'react-router'
import { ReactNode } from 'react'
import { selectStatus } from '@/features/dashboard/model/dashboardSelectors'

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const status = useSelector(selectStatus)

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Панель управления
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Выйти
          </Button>
        </Toolbar>
      </AppBar>
      {status === 'loading' && <LinearProgress />}
      <Container sx={{ mt: 3 }} maxWidth={'xl'}>
        {children}
      </Container>
    </>
  )
}
