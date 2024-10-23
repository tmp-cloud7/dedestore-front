import React, {useState} from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBFile,
  MDBBadge 
}
from 'mdb-react-ui-kit';
import avatar from "../Assets/avatar.jpg";
import Header from '../components/Header';

export default function Register() {
    // Capturing the User DP Upload
    const [file, setFile] = useState(avatar);
    const [userFile, setUserFile] = useState(avatar);
    const [fileErr, setFileErr] = useState("");

    // Function to handle imageUpload
    const handleFileUpload = (e) => {
        let image = e.target.files[0];
        if(image.type === "image/jpeg" || image.type === "image/jpg" || image.type === "image/png") {
            if(image.size >= 3*1024*1024) {
                setFileErr("Image size is too large");
            } else {
                setFile(URL.createObjectURL(image));
                setUserFile(image);
                setFileErr("");
            }
        } else {
            setFileErr("File type is not supported");
        }
    }

    // Capturing Form Data
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [userRole, setUserRole] = useState("");

    // Capturing Error
    const [err, setErr] = useState("");
    const [res, setRes] = useState("");


    async function handleFormSubmit () {

        // Validate all entries
        if (firstname !== "" && lastname !== "" && email !== "" && phone !== "" && password !== "" && cpassword !== "") {
             // Validate Phone Number
            if(phone.match(/^0[789][01]\d{8}$/)) {
                // Validate Password
                if(password === cpassword) {
                    if(password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w]{8,}$/)) {
                        let formData = new FormData();
                        formData.append('firstname', firstname);
                        formData.append('lastname', lastname);
                        formData.append('email', email);
                        formData.append('phone', phone);
                        formData.append('password', password);
                        formData.append('user_role', userRole);
                        formData.append('username', firstname + lastname.charAt(0).toUpperCase() + Math.floor(Math.random() * 1000));
                        if(userFile) {
                            formData.append('user_picture', userFile);
                        }
            
                        try {
                            let result = await fetch("http://localhost:8000/api/register", {
                                method: 'POST',
                                body: formData  
                            });
            
                            result = await result.json();
                            if(result.error) {
                                setErr("Registration Failed");
                                setRes("");
                                console.log(result.error);
                            } else {
                                setErr("");
                                setRes("Registration Successful");
                                console.log(result);
                            }
                        } catch(error) {
                            console.log(error);
                            setErr("Registration Failed")
                        }
                    } else {
                        setErr("Password Must contain atleast  1 Uppercase, 1 Lowercase & 1 Number with a minimum of 8 character");
                    }
                } else {
                    setErr("Password don't match");
                }
            } else {
                setErr("Invalid Phone Number");
            }
        }  else {
            setErr("All field Required");
        }
    }

    
  return (
    <>
        <Header/>
        <MDBContainer fluid>
            <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='7' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                            <h1 classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</h1>
                            <span className='badge bg-danger mb-2'>{err}</span>
                            <span className='badge bg-success mb-2'>{res}</span>

                            <div className="d-flex flex-row align-items-center mb-4 gap-2">
                                <MDBIcon fas icon="user me-3" size='lg'/>
                                <MDBInput label='Firstname' id='form1' type='text' className='w-100' name='firstname' value={firstname} onChange={(e) => setFirstname(e.target.value)} required/>
                                <MDBInput label='Lastname' id='form1' type='text' className='w-100' name='lastname' value={lastname} onChange={(e) => setLastname(e.target.value)} required/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4 gap-2 wrap">
                                <MDBIcon fas icon="envelope me-3" size='lg'/>
                                <MDBInput label=' Email Address' id='form2' type='email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                <MDBInput label=' Phone Number' id='form2' type='tel' name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="lock me-3" size='lg'/>
                                <MDBInput label='Password' id='form3' type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                <MDBInput label='Repeat your password' id='form4' type='password' name='cpassword' value={cpassword} onChange={(e) => setCpassword(e.target.value)} required/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4 gap-3">
                                {/* <MDBIcon fas icon="user me-3" size='lg' />
                                <MDBInput label='Username' id='form1' type='text' className='w-100' name='username'  /> */}
                                <select class="form-select" aria-label="Default select example" name="userRole" value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                                    <option selected>Select Your Role</option>
                                    <option value="user">User</option>
                                    <option value="vendor">Vender</option>
                                </select>
                            </div>

                        <MDBBtn className='mb-4' size='lg' onClick={handleFormSubmit}>Register</MDBBtn>

                        </MDBCol>
                            <MDBCol md='10' lg='4' className='order-1 order-lg-2 d-flex flex-column'>
                                <MDBBadge className='mx-2' color='danger' light>
                                    {fileErr}
                                </MDBBadge>
                                <MDBCardImage src={file} className='rounded' fluid/>
                                <MDBFile label='Upload Profile Picture' id='customFile' onChange={handleFileUpload} />
                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
    </>
  );
}
