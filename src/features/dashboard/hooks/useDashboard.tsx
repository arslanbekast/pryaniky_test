import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useSelector } from 'react-redux'
import {
  selectDocuments,
  selectError,
  selectStatus,
} from '@/features/dashboard/model/dashboardSelectors'
import { useEffect, useState } from 'react'
import { Document } from '@/features/dashboard/api/dashboardApi.types'
import { deleteDocument, fetchDocuments } from '@/features/dashboard/model/dashboardSlice'
import { GridColDef } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export const useDashboard = () => {
  const dispatch = useAppDispatch()
  const documents = useSelector(selectDocuments)
  const status = useSelector(selectStatus)
  const error = useSelector(selectError)
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [editingDocument, setEditingDocument] = useState<Document | null | undefined>(null)

  useEffect(() => {
    dispatch(fetchDocuments())
  }, [dispatch])

  const handleDelete = (id: string) => {
    dispatch(deleteDocument(id))
  }

  const handleEdit = (row: Document) => {
    setEditingDocument(row)
    setModalOpen(true)
  }

  const handleAdd = () => {
    setEditingDocument(null)
    setModalOpen(true)
  }

  const columns: GridColDef[] = [
    {
      field: 'companySigDate',
      headerName: 'Дата подписи компании',
      minWidth: 200,
      flex: 1,
      renderCell: params => dayjs(params.value).format('DD.MM.YYYY HH:mm'),
    },
    { field: 'companySignatureName', headerName: 'Подписант компании', minWidth: 150, flex: 1 },
    { field: 'documentName', headerName: 'Документ', minWidth: 150, flex: 1 },
    { field: 'documentStatus', headerName: 'Статус документа', minWidth: 150, flex: 1 },
    { field: 'documentType', headerName: 'Тип документа', minWidth: 150, flex: 1 },
    { field: 'employeeNumber', headerName: 'Номер сотрудника', minWidth: 150, flex: 1 },
    {
      field: 'employeeSigDate',
      headerName: 'Дата подписи сотрудника',
      minWidth: 150,
      flex: 1,
      renderCell: params => dayjs(params.value).format('DD.MM.YYYY HH:mm'),
    },
    { field: 'employeeSignatureName', headerName: 'Сотрудник', minWidth: 150, flex: 1 },
    {
      field: 'actions',
      headerName: 'Действия',
      sortable: false,
      renderCell: params => (
        <>
          <IconButton onClick={() => handleEdit(params.row)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ]

  return {
    documents,
    status,
    error,
    isModalOpen,
    setModalOpen,
    editingDocument,
    handleAdd,
    columns,
  }
}
