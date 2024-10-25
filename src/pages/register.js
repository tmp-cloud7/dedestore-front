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
import Header from '../Components/Header';

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

    // Capturing Form Data Error
    const [firstnameErr, setFirstnameErr] = useState("");
    const [lastnameErr, setLastnameErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [phoneErr, setPhoneErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [cpasswordErr, setCpasswordErr] = useState("");
    const [userRoleErr, setUserRoleErr] = useState("");

    // Capturing Error
    const [err, setErr] = useState("");
    const [res, setRes] = useState("");


    async function handleFormSubmit () {

        // Clear previous error messages
        setFirstnameErr("");
        setLastnameErr("");
        setEmailErr("");
        setPhoneErr("");
        setPasswordErr("");
        setCpasswordErr("");
        setUserRoleErr("");

        let formData = new FormData();
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password', password);
        formData.append('cpassword', cpassword);
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
            if(result.errors) {
                const errors = result.errors;
                if(errors.firstname) setFirstnameErr(errors.firstname[0])
                if(errors.lastname) setLastnameErr(errors.lastname[0])
                if(errors.email) setEmailErr(errors.email[0])
                if(errors.phone) setPhoneErr(errors.phone[0])
                if(errors.user_role) setUserRoleErr(errors.user_role[0])
                if(errors.password) setPasswordErr(errors.password[0])
                if(errors.cpassword) setCpasswordErr(errors.cpassword[0])
                setErr("Registration Failed");
                setRes("");
                console.log(result.errors);
            } else {
                setErr("");
                setRes("Registration Successful");
                console.log(result);
            }
        } catch(errors) {
            console.log(errors);
            setErr("Registration Failed")
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
                                <div className="d-flex flex-column">
                                    <MDBInput label='Firstname' id='form1' type='text' className='w-100' name='firstname' value={firstname} onChange={(e) => setFirstname(e.target.value)} required/>
                                    <span className='badge bg-danger mb-2'>{firstnameErr}</span>
                                </div>
                                
                                <div className="d-flex flex-column">
                                    <MDBInput label='Lastname' id='form1' type='text' className='w-100' name='lastname' value={lastname} onChange={(e) => setLastname(e.target.value)} required/>
                                    <span className='badge bg-danger mb-2'>{lastnameErr}</span>
                                </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4 gap-2 wrap">
                                <MDBIcon fas icon="envelope me-3" size='lg'/>
                                <div className="d-flex flex-column">
                                    <MDBInput label=' Email Address' id='form2' type='email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                    <span className='badge bg-danger mb-2'>{emailErr}</span>
                                </div>
                                <div className="d-flex flex-column">
                                    <MDBInput label=' Phone Number' id='form2' type='tel' name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
                                    <span className='badge bg-danger mb-2'>{phoneErr}</span>
                                </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="lock me-3" size='lg'/>
                                <div className="d-flex flex-column">
                                    <MDBInput label='Password' id='form3' type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                    <span className='badge bg-danger mb-2'>{passwordErr}</span>
                                </div>
                                <div className="d-flex flex-column">
                                    <MDBInput label='Repeat Password' id='form3' type='password' name='password' value={cpassword} onChange={(e) => setCpassword(e.target.value)} required/>
                                    <span className='badge bg-danger mb-2'>{cpasswordErr}</span>
                                </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4 gap-3">
                                {/* <MDBIcon fas icon="user me-3" size='lg' />
                                <MDBInput label='Username' id='form1' type='text' className='w-100' name='username'  /> */}
                                <select class="form-select" aria-label="Default select example" name="userRole" value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                                    <option selected>Select Your Role</option>
                                    <option value="user">User</option>
                                    <option value="vendor">Vender</option>
                                </select>
                                <span className='badge bg-danger mb-2'>{userRoleErr}</span>
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