import { useContext } from 'react'
import Item from './Item'
import { AppState } from '../../state'
import { Typography, Box } from '@mui/material'

const renderItems = (storage) => {
  return storage.map((item) => <Item key={item.id} {...item} />)
}

const Empty = () => {
  return (
    <Typography variant="body1">
      Storage is empty. You can add new items by pressing on the + button.
    </Typography>
  )
}

const StorageItems = () => {
  const { state } = useContext(AppState)
  const { storage } = state

  if (storage.length === 0) {
    return <Empty />
  }

  return (
    <Box sx={{ width: 'calc(100% - 1em)', overflow: 'auto' }}>
      {renderItems(storage)}
    </Box>
  )
}

export default StorageItems
