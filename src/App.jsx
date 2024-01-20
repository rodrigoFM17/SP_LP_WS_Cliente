
import { Route } from 'wouter'
import './App.css'
import Login from './pages/Login/Login'
import Calendar from './components/Calendar/Calendar'
import { UserContextProvider } from './context/UserContext'
import Home from './pages/Home/Home'
import NewDate from './pages/NewDate/NewDate'

function App() {
  

  return (
    <div className='app'>
      <UserContextProvider>
        <Route
        path='/'
        component={Login}
        />

        <Route
        path='/home'
        component={Home}
        />

        <Route 
        path='/dates'
        component={Calendar}
        />

        <Route
        path='/newDate/:id'
        component={NewDate}
        />



        
      </UserContextProvider>
    </div>
  )
}

export default App
