import { AppDispatch } from '@/app/store'
import axios from 'axios'
import { setAppError } from '@/app/appSlice'

/**
 * Обрабатывает ошибки сети, возникающие при отправке запросов на сервер
 * @param {unknown} error - Ошибка, которая произошла при отправке запроса на сервер
 * @param {AppDispatch} dispatch - Функция dispatch из библиотеки Redux для отправки actions
 * @returns {void} - Данная функция ничего не возвращает
 */

export const handleServerNetworkError = (error: unknown, dispatch: AppDispatch): void => {
  let errorMessage = 'Some error occurred!'
  // Проверка на наличие ошибки от сервера
  if (axios.isAxiosError(error)) {
    errorMessage = error.response?.data?.message || error?.message || errorMessage
    // Проверка на наличие нативной ошибки
  } else if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`
    // Какой-то непонятный кейс
  } else {
    errorMessage = JSON.stringify(error)
  }
  dispatch(setAppError(errorMessage))
}
