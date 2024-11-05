import React, {useState} from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [msg, setMsg] = useState();
    const navigate = useNavigate();

    async function login(){
        let userInfo = {email, password}
        let result = await fetch("http://localhost:8000/api/login", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }, 
            body: JSON.stringify(userInfo)
        }) 

        result = await result.json();
        if(result['error']) {
            setMsg(result['error'])
        } else {
            localStorage.setItem('userInfo', JSON.stringify(result));
            setMsg("Login Successful");
            navigate('/dashboard');
            console.log(result);
        }
    }
  return (
    <>
        <Header/>
        <MDBContainer className='my-5'>
        <MDBCard>

            <MDBRow className='g-0 d-flex align-items-center'>

            <MDBCol md='4'>
                <MDBCardImage src='https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg' alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
            </MDBCol>

            <MDBCol md='8'>
                <h1 className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</h1>

                <MDBCardBody>
                <span className='badge bg-warning mb-2'>{msg}</span>
                <MDBInput wrapperClass='mb-4' label='Email address  Or Phone Number' id='form1' type='text' onChange={(e) => setEmail(e.target.value)} value={email}/>
                <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={(e) => setPassword(e.target.value)} value={password}/>

                <div className="d-flex justify-content-between mx-4 mb-4">
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                    <a href="!#">Forgot password?</a>
                </div>

                <MDBBtn className="mb-4 w-100" onClick={login}>Sign in</MDBBtn>

                </MDBCardBody>

            </MDBCol>

            </MDBRow>

        </MDBCard>
        </MDBContainer>
    </>
  );
}

export default Login;