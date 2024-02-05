import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'

import AddIcon from '@mui/icons-material/ArrowCircleLeftOutlined'

type BackButtonProps = {
  route: string
}

const BackButton = ({ route }: BackButtonProps) => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(route)
  }

  return (
    <IconButton onClick={goBack} aria-label={'Back Button'}>
      <AddIcon sx={{ fontSize: '3em' }} />
    </IconButton>
  )
}

export default BackButton
