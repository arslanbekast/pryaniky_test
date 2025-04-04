import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { ReactNode } from 'react'
import { selectToken } from '@/features/auth/model/authSelectors'

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useSelector(selectToken)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
