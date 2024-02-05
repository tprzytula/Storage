import { Typography, Button } from '@mui/material'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import WarehouseIcon from '../components/icons/WarehouseIcon'

const IconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  color: theme.palette.custom.light,
  height: '50%',
  maxHeight: '500px',
  padding: '2em',
  position: 'relative',
}))

const Container = styled('div')({
  display: 'flex',
  height: '100%',
  width: 'calc(100% - 5em)',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
})

const Root = () => {
  const navigate = useNavigate()

  const enterStorageView = () => {
    navigate('/storage')
  }

  return (
    <Container>
      <Typography variant="subtitle1">Manage Storage on your device</Typography>
      <Typography variant="body1">
        Storage Manager helps you to keep track of your belongings
      </Typography>
      <IconContainer>
        <WarehouseIcon />
      </IconContainer>
      <Button
        variant="contained"
        sx={{
          width: '100%',
          maxWidth: '500px',
          height: '4rem',
          fontSize: '1.5em',
        }}
        onClick={enterStorageView}
      >
        Start organising
      </Button>
    </Container>
  )
}

export default Root
