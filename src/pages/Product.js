import React, {useState} from 'react';
import Header from '../Components/Header';
import badge from "../Assets/add.png";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBFile,
  MDBBadge 
}
from 'mdb-react-ui-kit';


export default function Product() {
   
  let loginUser = JSON.parse(localStorage.getItem("userInfo"));
  let vendor_id = loginUser["id"];

  const [ProductImage, setProductImage] = useState();
  const [file, setFile] = useState(badge);
  const [error, setError] = useState(null);
  const [res, setRes] = useState();



//    // Capturing the User DP Upload
//    const [file, setFile] = useState(badge);
//    const [userFile, setUserFile] = useState(badge);
//    const [fileErr, setFileErr] = useState("");

//    // Function to handle imageUpload
   const handleProductImage = (e) => {  
       let image = e.target.files[0];
       if(image.type === "image/jpeg" || image.type === "image/jpg" || image.type === "image/png") {
           if(image.size >= 3*1024*1024) {
               setError("Image size is too large");
           } else {
               setFile(URL.createObjectURL(image));
               setProductImage(image);
               setError("null");
           }
       } else {
           setError("File type is not supported");
       }
   }

   const [productInput, setProductInput] = useState({
    product_name: "",
    product_desc: "",
    initial_price: "",
    selling_price: "",
    quantity: "",
    category: "",
   });

   const {product_name, product_desc, initial_price,selling_price, quantity, category} = productInput;

   function handleInputChange(e) {
    setProductInput({...productInput, [e.target.name]:e.target.value});
   }

   async function hanldleFormSubmit(){
    let formData = new FormData();
    formData.append('product_name', product_name);
    formData.append('product_desc', product_desc);
    formData.append('initial_price', initial_price);
    formData.append('selling_price', selling_price);
    formData.append('quantity', quantity);
    formData.append('category', category);
    formData.append('vendor_id', vendor_id);
    formData.append('product_image', ProductImage);

    try {
              let result = await fetch("http://localhost:8000/api/addproduct", 
                formData,
                {
                    headers: {
                        "Content-Type":"multipart/form-data"
                     },
                }
              );
             setRes("Product Successfully Added");
             setError("");
             console.log(result.data);
            
            } catch (error) {
            console.log(error);
            setError("Product Registration Failed");

            if(error.response.data){
                console.log(error.response.data);
            }
        }
   }

//    // Capturing Form Data For Product
//    const [product_name, setProduct_name] = useState("");
//    const [product_desc, setProduct_desc] = useState("");
//    const [initial_price, setInitial_price] = useState("");
//    const [selling_price, setSelling_price] = useState("");
//    const [quantity, setQuantity] = useState("");
//    const [category, setCategory] = useState("");
   

//     // Capturing Form Data Error For Products
//     const [product_nameErr, setProduct_nameErr] = useState("");
//     const [product_descErr, setProduct_descErr] = useState("");
//     const [initial_priceErr, setInitial_priceErr] = useState("");
//     const [selling_priceErr, setSelling_priceErr] = useState("");
//     const [quantityErr, setQuantityErr] = useState("");
//     const [categoryErr, setCategoryErr] = useState("");
    

//    // Capturing Error
//    const [err, setErr] = useState("");
//    const [res, setRes] = useState("");


//   async function handleFormSubmit()  {
//      // Clear previous error messages
//      setProduct_nameErr("");
//      setProduct_descErr("");
//      setInitial_priceErr("");
//      setSelling_priceErr("");
//      setQuantityErr("");
//      setCategoryErr("");


//     let formData = new FormData();
//     formData.append('product_name', product_name);
//     formData.append('product_desc', product_desc);
//     formData.append('initial_price', initial_price);
//     formData.append('selling_price', selling_price);
//     formData.append('quantity', quantity);
//     formData.append('category', category);
//     formData.append('vendor_id', vendor_id);
    
//     if(userFile) {
//         formData.append('product_image', userFile);
//     }

//     try {
//       let result = await fetch("http://localhost:8000/api/addproduct", 
//         formData,
//         {
//             headers: {
//                 "Content-Type":"multipart/form-data"
//              },
//         }
//       );

//       result = await result.json();
//       if(result.errors) {
//           const errors = result.errors;
//           if(errors.product_name) setProduct_nameErr(errors.product_name[0])
//           if(errors.product_desc) setProduct_descErr(errors.product_desc[0])
//           if(errors.initial_price) setInitial_priceErr(errors.initial_price[0])
//           if(errors.selling_price) setSelling_priceErr(errors.selling_price[0])
//           if(errors.quantity) setQuantityErr(errors.quantity[0])
//           if(errors.category) setCategoryErr(errors.category[0])
//           setErr("Registration Failed");
//           setRes("");
//           console.log(result.errors);
//       } else {
//           setRes("Registration failed");
//           setErr("");
//           setProduct_name("");
//           setProduct_desc("");
//           setInitial_price("");
//           setSelling_price("");
//           setQuantity("");
//           setCategory("");
//           console.log(result);
//       }
//   } catch(errors) {
//       console.log(errors);
//       setErr("Product Added Successfully");
//   }


//   }
  return (
   <>
   <Header/>
   <MDBContainer fluid>
            <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='7' className=' d-flex flex-column align-items-center'>

                            <h1 classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Add Product</h1>
                            <span className='badge bg-success mb-2'>{res}</span>

                            <div className="d-flex flex-row align-items-center mb-4 gap-2">
                                
                                <div className="d-flex flex-column">
                                    <MDBInput label='Enter Product Name' id='form1' type='text' className='w-100' name='product_name' value={product_name} onChange={handleInputChange} required/>
                                    
                                </div>
                                
                                <div className="d-flex flex-column">
                                    <MDBInput label='Enter Product Desc' id='form1' type='text' className='w-100' name='product_desc' value={product_desc} onChange={handleInputChange} required/>
                                </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4 gap-2 wrap">
                              
                                <div className="d-flex flex-column">
                                    <MDBInput label=' Initial Price' id='form2' type='number' name="initial_price" min={0} value={initial_price} onChange={handleInputChange} required/>
                                    
                                </div>
                                <div className="d-flex flex-column">
                                    <MDBInput label=' Selling Price' id='form2' type='number' name="selling_price" min={0} value={selling_price} onChange={handleInputChange} required/>
                                    
                                </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              
                                <div className="d-flex flex-column">
                                    <MDBInput label='Quantity' id='form3' type='number' name='quantity' value={quantity} min={0} onChange={handleInputChange} required/>
                                    
                                </div>
                                <div className="d-flex flex-column">
                                    <MDBInput label='Category' id='form3' type='text' name='category' value={category} min={0} onChange={handleInputChange} required/>
                                    
                                </div>
                                <div className="d-flex flex-column">
                                    <MDBInput label='Vendor_Id' id='form3' type='hidden' name='vendor_id' value={vendor_id}/>
                                    
                                </div>


                            </div>

                        <MDBBtn className='mb-4' size='lg' onClick={hanldleFormSubmit}>Add Product</MDBBtn>

                        </MDBCol>
                            <MDBCol md='10' lg='4' className='order-1 order-lg-2 d-flex flex-column'>
                                <MDBBadge className='mx-2' color='danger' light>
                                    {error}
                                </MDBBadge>
                                <MDBCardImage src={file} className='rounded' fluid/>
                                <MDBFile label='Upload Profile Picture' id='customFile' onChange={handleProductImage} />
                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
   
   </>
  );
}
