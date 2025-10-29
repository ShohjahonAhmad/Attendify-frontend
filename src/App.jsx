import {RouterProvider, createRoutesFromElements, createBrowserRouter, Route} from 'react-router-dom';
import Login, {action as loginAction, loader as loginLoader} from './pages/Login'
import Home from './pages/Home'
import Courses, {action as coursesAction, loader as coursesLoader} from './pages/Courses';
import Course, {loader as courseLoader} from './pages/Course'
import Registration, {action as registrationAction} from './pages/Registration';
function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path = '/' element = {<Home />}/>
      <Route path='/login' element = {<Login />} action = {loginAction} loader = {loginLoader}/>
      <Route path='/registration' element = {<Registration/>} action = {registrationAction}/>
      <Route path='/courses'>
        <Route index element = {<Courses/>} action = {coursesAction} loader = {coursesLoader}/>
        <Route path = ':id' element = {<Course/>} loader = {courseLoader}/>
      </Route>
      <Route path = '*' element = {<h1>Route not found</h1>} />

    </Route>
  ))

  return (
      <RouterProvider router={router}/>
  )
}

export default App
