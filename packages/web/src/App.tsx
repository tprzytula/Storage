import './App.module.scss'

import { Routes, Route } from 'react-router-dom'
import { styled } from '@mui/system'
import Root from './routes/Root'
import Storage from './routes/Storage'
import StorageAddItem from './routes/StorageAddItem'

const ApplicationContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  width: '100%',
  background: theme.palette.custom.background,
  justifyContent: 'center',
  alignItems: 'center',
}))

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  maxHeight: '1000px',
  maxWidth: '400px',
  height: '100%',
  width: '100%',
  margin: 0,
})

export function App() {
  return (
    <ApplicationContainer>
      <Content>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/storage/add" element={<StorageAddItem />} />
        </Routes>
      </Content>
    </ApplicationContainer>
  )
}
