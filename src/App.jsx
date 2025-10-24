import {RouterProvider, createRoutesFromElements, createBrowserRouter, Route} from 'react-router-dom';
import Login, {action as loginAction, loader as loginLoader} from './pages/Login'
import Home from './pages/Home'
import Registration, {action as registrationAction} from './pages/Registration';
function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path = '/' element = {<Home />}/>
      <Route path='/login' element = {<Login />} action = {loginAction} loader = {loginLoader}/>
      <Route path='/registration' element = {<Registration/>} action = {registrationAction}/>

    </Route>
  ))

  return (
      <RouterProvider router={router}/>
  )
}

export default App
