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
// import validator from "validator";
// import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'

export default function Register() {
    // Capturing the User DP Upload
    const [file, setFile] = useState(avatar);
    const [fileErr, setFileErr] = useState("");

    // Function to handle imageUpload
    const handleFileUpload = (e) => {
        let image = e.target.files[0];
        if(image.type === "image/jpeg" || image.type === "image/jpg" || image.type === "image/png") {
            if(image.size >= 3*1024*1024) {
                setFileErr("Image size is too large");
            } else {
                setFile(URL.createObjectURL(image));
                setFileErr("");
            }
        } else {
            setFileErr("File type is not supported");
        }
    }

    ///////////////////////////// 16 - 10 - 2024 /////////////////////////////////////////////////////////////////////////////
  
    // Destructure//
    const [formInput, setForminput] = useState ({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassord: "",
        username: "",
        userRole: "",
    });

    //Another Destructuring: To fish out each value and assign each to a variable
    // const firstname = forminput.firstname
    const {firstname, lastname, email, phone, password, confirmPassword, username, userRole} = formInput;

    // Function to handle input
    const handleInputChange = (e) => {
        setForminput({ ...formInput, [e.target.name]: e.target.value});
    }

    // Function To Handle Registration
    async function handleFormSubmit () {
        // Form Validation
        if (firstname !== "" && lastname !== "" && email !== "" && phone !== "" && password !== "" && confirmPassword !== "" && username !== "" ) {
            if (password === confirmPassword) {
                if (password.length >= 8) {
                    // We use formdata because we are passing in a file.its not necessary for string
                    // question,,, hows is done with on string without form data 
                    let formData = new formData ();
                    formData.append('firstname', firstname);
                    formData.append('lastname', lastname);
                    formData.append('email',email);
                    formData.append('phone',phone);
                    formData.append('password',password);
                    formData.append('username', firstname + lastname.charAt(0).toUpperCase() + Math.floor(Math.random() * 1000));
                    formData.append('user_role', userRole);
                    formData.append('user_picture', file);
                
                    let result = await fetch ("http://localhost:8000/api/register", {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    let data = await result.json();
                    console.log(data)
                } else {
                    alert ("Passwords should be at least 8 characters long")
                }
            } else {
                alert ("Passwords do not match")
            }
        } else {
            alert ("Please fill all required fields");
        }

       
    }

    // /////////////////////////////////////////////////// PRACTICE ////////////////////////////////////////////////////////    
    // // Capturing Form Data
    // const [firstname, setFirstname] = useState("");
    // // console.log(firstname);
    // const [lastname, setLastname] = useState("");
    // const [username, setUsername] = useState("");
    // // const [userrole, setUserrole] = useState("");

    // // Capturing Email
    // const [message, setMessage] = useState("");

    // const validateEmail = (e) => {
    //     const email = e.target.value;

    //     if (validator.isEmail(email)) {
    //         setMessage('Thank you')
    //     } else {
    //         setMessage('Invalid Email Format')
    //     }
    // }

    // // Phone Validation
    // const [PhoneNumber, SetPhoneNumber] = useState("");
    // const [valid, SetValid] = useState(true);

    // const handleChange = (value) => {
    //     const input = event.target.value;
    //     SetPhoneNumber(value);
    //     SetValid(validatePhoneNumber(value));
    // };

    // const validatePhoneNumber = (phoneNumber) => {
    //     const phoneNumberPattern = /^\d{10}$/;
    //     return phoneNumberPattern.test(phoneNumber);
    // }

    // // const [password, Setpasword] = usestate('');
    // // function handleChange(e) {
    // //     Setpasword(e.target.value)
    // // }

  return (
    <>
        <Header/>
        <MDBContainer fluid>
            <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='7' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                            <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                            <div className="d-flex flex-row align-items-center mb-4 gap-2">
                                <MDBIcon fas icon="user me-3" size='lg'/>
                                <MDBInput label='Firstname' id='form1' type='text' className='w-100' name='firstname' value={firstname} onChange={handleInputChange} />
                                <MDBInput label='Lastname' id='form1' type='text' className='w-100'  name='lastname'  value={lastname} onChange={handleInputChange}/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4 gap-2 wrap">
                                <MDBIcon fas icon="envelope me-3" size='lg'/>
                                <MDBInput label=' Email Address' id='form2' type='email' name='email' value={email} onChange={handleInputChange}/> <br/>
                                {/* <span style={{fontWeight:'bold', color:'red'}}>
                                    {message}
                                </span> */}
                                 <MDBInput label=' Phone Number' id='form2' type='tel' name='phone' value={phone} onChange={handleInputChange}/> <br/>
                               {/* <label>
                                Phone Number: <PhoneInput country={'us'} value={PhoneNumber} onChange={handleChange} inputProps={{ required: true, }}/>
                               </label>
                               {!valid && <p>Please Enter a Valid Phone Number.</p> } */}
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="lock me-3" size='lg'/>
                                <MDBInput label='Password' id='form3' type='password' name='password' value={password} onChange={handleInputChange}/>
                                <MDBInput label='Repeat your password' id='form4' type='password' name='confirmPassword' value={confirmPassword} onChange={handleInputChange}/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4 gap-3">
                                <MDBIcon fas icon="user me-3" size='lg'/>
                                <MDBInput label='Username' id='form1' type='text' className='w-100' name='username' value={username} onChange={handleInputChange}/>
                                <select class="form-select" aria-label="Default select example"  name='userRole' value={userRole} onChange={handleInputChange}>
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