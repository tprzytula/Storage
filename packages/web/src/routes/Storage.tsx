import { useContext, useEffect, useState } from 'react'
import { Typography, CircularProgress } from '@mui/material'
import { styled } from '@mui/system'
import StorageItems from '../components/StorageItems'
import { AppState, Actions } from '../state'
import { retrieveItems } from '../api'
import Navigation from '../components/Navigation'
import AddItemButton from '../components/AddItemButton'

const Container = styled('div')({
  display: 'flex',
  height: '100%',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
})

const fetchItems = async ({ dispatch, setIsLoading }) => {
  setIsLoading(true)

  try {
    const items = await retrieveItems('storage') // TODO: Change once the user is in control of the names

    dispatch({
      type: Actions.SET_STORAGE,
      payload: items,
    })
  } catch (error) {
    console.error(error)
  }

  setIsLoading(false)
}

const Storage = () => {
  const { dispatch } = useContext(AppState)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchItems({ dispatch, setIsLoading })
  }, [dispatch])

  return (
    <Container
      sx={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}
    >
      <Typography variant="subtitle2" sx={{ padding: '1em' }}>
        Storage
      </Typography>
      {isLoading ? <CircularProgress /> : <StorageItems />}

      <Navigation previousRoute="/" actionButton={<AddItemButton />} />
    </Container>
  )
}

export default Storage
