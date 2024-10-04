import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Footer from './components/Footer'
import Project from './pages/Project'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register={"register"}/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/project' element={<Project/>} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
