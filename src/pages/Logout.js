import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Components/Header';

export default function Logout() {
    const navigate = useNavigate();
    useEffect(()=> {
        localStorage.clear()
        navigate('/login')
    }, [])
  return (
    <>
       <Header/>
    </>
  )
}
