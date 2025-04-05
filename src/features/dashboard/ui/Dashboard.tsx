import { Box, Button, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { AddDocumentModal } from '@/features/dashboard/ui/AddDocumentModal/AddDocumentModal'
import { useDashboard } from '@/features/dashboard/hooks/useDashboard'

export const Dashboard = () => {
  const {
    documents,
    status,
    error,
    isModalOpen,
    setModalOpen,
    editingDocument,
    handleAdd,
    columns,
  } = useDashboard()

  return (
    <>
      {error ? (
        <Box
          sx={{
            height: 400,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography color="error">{error}</Typography>
        </Box>
      ) : (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={documents}
            columns={columns}
            autoPageSize={true}
            pageSizeOptions={[5, 10, 100]}
            loading={status === 'loading'}
          />
        </Box>
      )}

      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleAdd}>
        Добавить документ
      </Button>
      <AddDocumentModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        document={editingDocument}
      />
    </>
  )
}
