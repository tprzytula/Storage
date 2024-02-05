import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import AddIcon from '@mui/icons-material/AddCircleOutline'

const AddItem = () => {
  const navigate = useNavigate()

  const enterAddItemView = () => {
    navigate('/storage/add')
  }

  return (
    <IconButton onClick={enterAddItemView} aria-label={'Add Icon'}>
      <AddIcon sx={{ fontSize: '3em' }} />
    </IconButton>
  )
}

export default AddItem
