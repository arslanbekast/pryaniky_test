import { createBrowserRouter, RouterProvider } from 'react-router'
import { Login } from '@/features/auth/ui/Login'
import { AppLayout } from '@/common/layouts/AppLayout'
import { ProtectedRoute } from '@/common/routes/ProtectedRoute'
import { Dashboard } from '@/features/dashboard/ui/Dashboard'
import { ErrorPage } from '@/pages/ErrorPage/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout>
          <Dashboard />
        </AppLayout>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
