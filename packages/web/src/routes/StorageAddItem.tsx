import { styled } from '@mui/system'
import AddItemForm from '../components/AddItemForm'
import Navigation from '../components/Navigation'

const Container = styled('div')({
  display: 'flex',
  height: '100%',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
})

const StorageAddItem = () => {
  return (
    <Container>
      <AddItemForm />
      <Navigation previousRoute="/storage" />
    </Container>
  )
}

export default StorageAddItem
