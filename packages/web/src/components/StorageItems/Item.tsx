import { useContext } from 'react'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material'

import AddIcon from '@mui/icons-material/AddCircleOutline'
import DeleteIcon from '@mui/icons-material/HighlightOff'
import RemoveIcon from '@mui/icons-material/RemoveCircleOutline'

import { StorageItem } from '../../state/types'
import * as API from '../../api'
import { AppState, Actions } from '../../state'
import * as Icons from '../../icons'

const Item = ({ id, name, quantity, form, icon, collection }: StorageItem) => {
  const { dispatch } = useContext(AppState)

  const deleteItem = async () => {
    const result = await API.deleteItem(id, collection)

    if (result) {
      dispatch({
        type: Actions.REMOVE_STORAGE_ITEM,
        payload: id,
      })
    }
  }

  const updateItem = async (item: Omit<StorageItem, 'collection'>) => {
    const updatedItem = await API.updateItem(item, collection)

    if (updatedItem) {
      dispatch({
        type: Actions.UPDATE_STORAGE_ITEM,
        payload: updatedItem,
      })
    }
  }

  const increaseQuantity = async () => {
    await updateItem({
      id,
      name,
      quantity: quantity + 1,
      form,
      icon,
    })
  }

  const decreaseQuantity = async () => {
    if (quantity === 0) {
      return
    }

    await updateItem({
      id,
      name,
      quantity: quantity - 1,
      form,
      icon,
    })
  }

  return (
    <Card
      sx={{
        display: 'flex',
        borderRadius: 0.2,
        minHeight: '100px',
        margin: '1em 0',
        width: '100%',
        justifyContent: 'flex-start',
        boxSizing: 'border-box',
      }}
    >
      <CardActionArea sx={{ display: 'flex', padding: '0 2em' }}>
        <CardMedia
          component="img"
          sx={{ width: 80, objectFit: 'contain' }}
          image={icon in Icons ? Icons[icon] : null}
          alt={`${name} Image`}
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            flexGrow: '1',
          }}
        >
          <Typography
            component="div"
            variant="subtitle2"
            aria-label="Item Name"
          >
            {name}
          </Typography>

          <Box sx={{ textAlign: 'center', flexGrow: '0' }}>
            <IconButton
              aria-label="Decrease Quantity"
              onClick={decreaseQuantity}
              onTouchStart={(event) => event.stopPropagation()}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <RemoveIcon sx={{ fontSize: '1em' }} />
            </IconButton>
            <Typography
              component="span"
              variant="body1"
              sx={{ textAlign: 'center' }}
              aria-label="Item Quantity"
            >
              {quantity}
            </Typography>
            <IconButton
              aria-label="Increase Quantity"
              onClick={increaseQuantity}
              onTouchStart={(event) => event.stopPropagation()}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <AddIcon sx={{ fontSize: '1em' }} />
            </IconButton>
          </Box>
          <Typography component="div" variant="body1" aria-label="Item Form">
            {form}
          </Typography>
        </CardContent>
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '1em',
            textAlign: 'center',
          }}
        >
          <IconButton
            aria-label="Delete"
            onClick={deleteItem}
            onTouchStart={(event) => event.stopPropagation()}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <DeleteIcon sx={{ fontSize: '1em' }} />
          </IconButton>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Item
