import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSelector } from 'react-redux'
import {
  selectError,
  selectIsAuthenticated,
  selectStatus,
} from '@/features/auth/model/authSelectors'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { clearError, login } from '@/features/auth/model/authSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const formSchema = z.object({
  username: z.string().min(5, 'Имя пользователя не должно быть менее 5 символов'),
  password: z.string().min(8, 'Пароль не должен быть менее 8 символов'),
})

type FormValues = z.infer<typeof formSchema>
export const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })
  const status = useSelector(selectStatus)
  const error = useSelector(selectError)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useAppDispatch()

  const onSubmit = (data: FormValues) => {
    dispatch(login(data))
  }

  const watchedFields = watch()
  useEffect(() => {
    if (error) {
      dispatch(clearError())
    }
  }, [watchedFields.username, watchedFields.password, dispatch])

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  return {
    register,
    handleSubmit,
    errors,
    error,
    status,
    isAuthenticated,
    onSubmit,
  }
}
