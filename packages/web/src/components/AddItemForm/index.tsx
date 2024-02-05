import { Typography, Paper, TextField, Button } from '@mui/material'
import { useState } from 'react'
import { addItem } from '../../api'
import { useNavigate } from 'react-router-dom'
import IconPicker from '../IconPicker'

const AddItemForm = () => {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [form, setForm] = useState('')
  const [icon, setIcon] = useState('product')
  const navigate = useNavigate()

  const onSubmit = async () => {
    if (name === '' || form === '') {
      return
    }

    if (!isFinite(quantity) || quantity <= 0) {
      return
    }

    const item = await addItem(
      {
        name,
        quantity,
        form,
        icon,
      },
      'storage'
    )

    if (item) {
      navigate('/storage')
    }
  }

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        width: '95%',
        padding: '1.5em 0',
      }}
    >
      <Typography variant="subtitle2" sx={{ padding: '1em' }}>
        Add Item
      </Typography>
      <TextField
        required
        value={name}
        label="Name"
        onChange={(event) => setName(event.target.value)}
        sx={{ margin: '0.5em 0', width: '80%' }}
      />
      <TextField
        required
        value={quantity}
        label="Quantity"
        type="number"
        onChange={(event) => setQuantity(parseInt(event.target.value, 10))}
        sx={{ margin: '0.5em 0', width: '80%' }}
      />
      <TextField
        required
        value={form}
        label="Form"
        onChange={(event) => setForm(event.target.value)}
        sx={{ margin: '0.5em 0', width: '80%' }}
      />
      <IconPicker onChange={(icon) => setIcon(icon)} />
      <Button
        variant="contained"
        sx={{ margin: '1em 0', width: '10em', height: '3em' }}
        onClick={onSubmit}
        aria-label={'Add Button'}
      >
        Add
      </Button>
    </Paper>
  )
}

export default AddItemForm
