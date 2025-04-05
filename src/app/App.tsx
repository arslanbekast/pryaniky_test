import { Router } from '@/common/routes/Router'
import { toast, ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import { selectAppError } from '@/app/appSelectors'
import { useEffect } from 'react'

export function App() {
  const error = useSelector(selectAppError)

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  return (
    <div>
      <ToastContainer
        autoClose={3000}
        closeOnClick
        draggable
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss
        pauseOnHover
        position={'bottom-left'}
        rtl={false}
      />
      <Router />
    </div>
  )
}
