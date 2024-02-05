import { useState } from 'react'
import {
  Box,
  Paper,
  Modal,
  Typography,
  CardMedia,
  IconButton,
} from '@mui/material'
import * as Icons from '../../icons'

const Icon = ({
  iconKey,
  onSelect,
}: {
  iconKey: string
  onSelect: (icon: string) => void
}) => {
  return (
    <IconButton onClick={() => onSelect(iconKey)}>
      <CardMedia
        component="img"
        sx={{ height: 80, width: 80, objectFit: 'contain', padding: '0.25em' }}
        image={Icons[iconKey]}
        alt={`${iconKey} image`}
      />
    </IconButton>
  )
}

const renderIcons = (onSelect) => {
  return Object.keys(Icons).map((key) => (
    <Icon onSelect={onSelect} key={key} iconKey={key} />
  ))
}

type IconPickerProps = {
  onChange: (icon: string) => void
}

const IconPicker = ({ onChange }: IconPickerProps) => {
  const [selectedIcon, setSelectedIcon] = useState('product')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onSelect = (icon) => {
    setIsModalOpen(false)
    setSelectedIcon(icon)

    onChange(icon)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography
        variant="body2"
        sx={{ width: '100%', textAlign: 'center', paddingTop: '0.5em' }}
      >
        Click to change Icon
      </Typography>
      <IconButton
        onClick={() => {
          setIsModalOpen(true)
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: 80,
            width: 80,
            objectFit: 'contain',
            padding: '0.25em',
          }}
          image={Icons[selectedIcon]}
          alt={`${selectedIcon} image`}
        />
      </IconButton>
      <Modal
        open={isModalOpen}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          sx={{
            display: 'flex',
            height: '90%',
            width: '90%',
            flexWrap: 'wrap',
            alignItem: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            overflowY: 'auto',
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ width: '100%', textAlign: 'center', paddingTop: '0.5em' }}
          >
            Select Icon
            <hr />
          </Typography>
          {renderIcons(onSelect)}
        </Paper>
      </Modal>
    </Box>
  )
}

export default IconPicker
