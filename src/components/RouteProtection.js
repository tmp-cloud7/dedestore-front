import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RouteProtection(props) {
    const navigate = useNavigate();
    let Cmp = props.cmp;
    useEffect(()=>{
        if(localStorage.getItem('userInfo')) {
            Cmp = props.cmp;
            return;
        } else {
            navigate("/login");
        }
    },[])
  return (
    <>
        <Cmp/>
    </>
  )
}
