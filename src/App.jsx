import {RouterProvider, createRoutesFromElements, createBrowserRouter, Route} from 'react-router-dom';
import Login, {action as loginAction, loader as loginLoader} from './pages/Login'
import Home from './pages/Home'
import Curator, {action as curatorAction, loader as curatorLoader} from './pages/Curator';
import Registration, {action as registrationAction} from './pages/Registration';
function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path = '/' element = {<Home />}/>
      <Route path='/login' element = {<Login />} action = {loginAction} loader = {loginLoader}/>
      <Route path='/registration' element = {<Registration/>} action = {registrationAction}/>
      <Route path='/curator' element = {<Curator/>} action = {curatorAction} loader = {curatorLoader}/>
      <Route path = '*' element = {<h1>Route not found</h1>} />

    </Route>
  ))

  return (
      <RouterProvider router={router}/>
  )
}

export default App
