import {Route, Routes} from 'react-router-dom'
import FirstPage from './components/FirstPage'
import SecondPage from './components/SecondPage'
import './App.css'
import { NavLink } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <>
    <div className='header'>
    <h1>Grow Me Organic</h1>
    <NavLink to='/'><h2>Home</h2></NavLink>
    </div>
    
    <Routes>
      <Route path='/' element={<FirstPage></FirstPage>}></Route>
      <Route path='/data' element={<SecondPage></SecondPage>}></Route>
    </Routes>
    </>
    
  )
}
export default App