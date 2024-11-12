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
  MDBBadge,
  MDBTextArea
}
from 'mdb-react-ui-kit';


export default function Product() { 
     // Capturing the vendor info
  let loginUser = JSON.parse(localStorage.getItem('userInfo'));
  let vendor_id = loginUser['id'];
  // console.log(vendor_id)

  // CApturing the product image 
  const [file, setFile] = useState("");
  const [productFile, setProductFile] = useState("");
  const [fileErr, setFileErr] = useState("");

  const handleFileUpload = (e) => {
    let image = e.target.files[0];
    if(image.type === "image/jpeg" || image.type === "image/jpg" || image.type === "image/png") {
      if(image.size >= 5*1024*1024) {
        setFileErr("Image size is too large");
      } else {
        setFile(image);
        setProductFile(URL.createObjectURL(image));
        setFileErr("");
      }
    } else {
      setFileErr("File type is not supported");
    }
  }

  // Capturing Form Data
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productInitialPrice, setProductInitialPrice] = useState(0);
  const [productSellingPrice, setProductSellingPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [productCategory, setProductCategory] = useState("");

  // Capturing Form Data Error
  const [productNameErr, setProductNameErr] = useState("");
  const [productDescErr, setProductDescErr] = useState("");
  const [productInitialPriceErr, setProductInitialPriceErr] = useState("");
  const [productSellingPriceErr, setProductSellingPriceErr] = useState("");
  const [productQuantityErr, setProductQuantityErr] = useState("");
  const [productCategoryErr, setProductCategoryErr] = useState("");

  // Capturing Response
  const [err, setErr] = useState("");
  const [res, setRes] = useState("");

  // function to send data to the backend
  async function handleFormSubmit () {
    // clear previous error messages
    setProductNameErr("")
    setProductDescErr("");
    setProductInitialPriceErr("");
    setProductSellingPriceErr("");
    setProductQuantityErr("");
    setProductCategoryErr("");

    // if (productInitialPrice < productSellingPrice) {
    //   formData declaration
    // } else {
    //   setProductInitialPriceErr("Initial Price must be greater than Selling Price");
    // }

    let formData = new FormData();
    formData.append('product_name', productName);
    formData.append("product_desc", productDesc);
    formData.append('initial_price', productInitialPrice);
    formData.append('selling_price', productSellingPrice);
    formData.append('quantity', productQuantity);
    formData.append('category', productCategory);
    formData.append('product_image', file);
    formData.append('vendor_id', vendor_id);

    try {
      let result = await fetch("http://localhost:8000/api/addproduct", {
        method: "POST",
        body: formData
      });

      result = await result.json();
      if (result.errors) {
        const errors = result.errors;
        if(errors.product_name) setProductNameErr(errors.product_name[0]);
        if(errors.product_desc) setProductDescErr(errors.product_desc[0]);
        if (errors.initial_price) setProductInitialPriceErr(errors.initial_price[0]);
        if (errors.selling_price) setProductSellingPriceErr(errors.selling_price[0]);
        if (errors.quantity) setProductQuantityErr(errors.quantity[0]);
        if (errors.category) setProductCategoryErr(errors.category[0]);
        if(errors.product_image) setFileErr(errors.product_image[0]);
        setErr("Registration Failed");
        setRes("");
        
      } else {
        setRes("Product Added Succcessfully");
        setErr("");
        setProductName("");
        setProductDesc("");
        setProductInitialPrice("");
        setProductSellingPrice("");
        setProductQuantity("");
        setProductCategory("");
        setFile("");
        setProductFile("");
        console.log(result);
      } 

    } catch (errors){
      setErr("Registation Failed");
    }
  }

  return (
    <>
        <Header/>
        <MDBContainer fluid>

        <MDBRow className='d-flex justify-content-center align-items-center'>

            <MDBCol lg='8'>

            <MDBCard className='my-5 rounded-3' style={{maxWidth: '600px'}}>
                <span className='badge bg-danger mb-2'>{err}</span>
                <span className='badge bg-success mb-2'>{res}</span>
                <MDBCardImage src={productFile} className='w-100 rounded-top'  alt="Product Image"/>
                <MDBBadge className='mx-2' color='danger' light>
                  {fileErr}
                </MDBBadge>
                {/* <MDBCardImage src={productFile} className='rounded' fluid/> */}
                <MDBFile label='Upload Product Picture' id='customFile' onChange={handleFileUpload} wrapperClass='mb-4'/>

                <MDBCardBody className='px-5'>

                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Add Product</h3>
                <MDBInput wrapperClass='mb-4' label='Product Name' id='form1' type='text' onChange={(e) => setProductName(e.target.value)} value={productName}/>
                <span className='badge bg-danger mb-2'>{productNameErr}</span>

                <MDBTextArea wrapperClass='mb-4' label="Product Description" id="textAreaExample" rows="{4}" onChange={(e) => setProductDesc(e.target.value)} value={productDesc}/>
                <span className='badge bg-danger mb-2'>{productDescErr}</span>

                <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='Initial Price' id='form1' type='number' min="0" onChange={(e) => setProductInitialPrice(e.target.value)} value={productInitialPrice}/>
                      <span className='badge bg-danger mb-2'>{productInitialPriceErr}</span>
                    </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='Selling Price' id='form1' type='number' min="0" max={productInitialPrice} onChange={(e)=> setProductSellingPrice(e.target.value)} />
                      <span className='badge bg-danger mb-2'>{productSellingPriceErr}</span>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='Quantity' id='form1' type='number' min="1" onChange={(e) => setProductQuantity(e.target.value)} value={productQuantity}/>
                      <span className='badge bg-danger mb-2'>{productQuantityErr}</span>
                    </MDBCol>
                    <MDBCol md='6'>
                      <select class="form-select" aria-label="Default select example" onChange={(e) => setProductCategory(e.target.value)} value={productCategory}>
                        <option selected>Category</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Electronic">Electronic</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Grocery">Grocery</option>
                      </select>
                      <span className='badge bg-danger mb-2'>{productCategoryErr}</span>
                    </MDBCol>
                </MDBRow>
                <MDBBtn color='success' className='mb-4' size='lg' onClick={handleFormSubmit}>Submit</MDBBtn>

                </MDBCardBody>
            </MDBCard>

            </MDBCol>
        </MDBRow>

        </MDBContainer>
    </>
  );
}
   
//   let loginUser = JSON.parse(localStorage.getItem("userInfo"));
//   let vendor_id = loginUser["id"];

//    // Capturing the User DP Upload
//    const [file, setFile] = useState("");
//    const [userFile, setUserFile] = useState("");
//    const [fileErr, setFileErr] = useState("");

//    // Function to handle imageUpload
//    function handleproductImageUpload (e) {
//     let image = e.target.files[0];
//     if(image.type === "image/jpg" || image.type === "image/jpeg" || image.type === "image/png") {
//         if (image >= 3 * 1024 * 1024) {
//             setFileErr("file size is too large")
//         } else {
//             setFile (URL.createObjectURL(image));
//             setUserFile(image);
//             setFileErr("")
//         }
//     } else {
//         setFileErr("Image type not supported")
//     }
// }


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
//     formData.append('product_image', userFile);
    

//     try {
//       let result = await fetch("http://localhost:8000/api/addproduct", {
//             method: 'POST',
//             body: formData
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
//           setRes("Product Added Successfully");
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
//       setErr("Registration failed");
//   }


//   }
//   return (
//    <>
//    <Header/>
//    <MDBContainer fluid>
//             <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
//                 <MDBCardBody>
//                     <MDBRow>
//                         <MDBCol md='10' lg='7' className=' d-flex flex-column align-items-center'>

//                             <h1 classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Add Product</h1>
//                             <span className='badge bg-success mb-2'>{res}</span>
//                             <span className='badge bg-danger mb-2'>{err}</span>

//                             <div className="d-flex flex-row align-items-center mb-4 gap-2">
                                
//                                 <div className="d-flex flex-column">
//                                     <MDBInput label='Enter Product Name' id='form1' type='text' className='w-100' name='product_name' value={product_name} onChange={(e) => setProduct_name(e.target.value)} required/>
//                                     <span className='badge bg-danger mb-2'>{product_nameErr}</span>
//                                 </div>
                                
//                                 <div className="d-flex flex-column">
//                                     <MDBInput label='Enter Product Desc' id='form1' type='text' className='w-100' name='product_desc' value={product_desc} onChange={(e) => setProduct_desc(e.target.value)} required/>
//                                     <span className='badge bg-danger mb-2'>{product_descErr}</span>
//                                 </div>
//                             </div>

//                             <div className="d-flex flex-row align-items-center mb-4 gap-2 wrap">
                              
//                                 <div className="d-flex flex-column">
//                                     <MDBInput label=' Initial Price' id='form2' type='number' name="initial_price" value={initial_price} onChange={(e) => setInitial_price(e.target.value)} required/>
//                                     <span className='badge bg-danger mb-2'>{initial_priceErr}</span>
//                                 </div>
//                                 <div className="d-flex flex-column">
//                                     <MDBInput label=' Selling Price' id='form2' type='number' name="selling_price" value={selling_price} onChange={(e) => setSelling_price(e.target.value)} required/>
//                                     <span className='badge bg-danger mb-2'>{selling_priceErr}</span>
//                                 </div>
//                             </div>

//                             <div className="d-flex flex-row align-items-center mb-4">
                              
//                                 <div className="d-flex flex-column">
//                                     <MDBInput label='Quantity' id='form3' type='number' name='quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} required/>
//                                     <span className='badge bg-danger mb-2'>{quantityErr}</span>
//                                 </div>
//                                 <div className="d-flex flex-column">
//                                     <MDBInput label='Category' id='form3' type='text' name='category' value={category} onChange={(e) => setCategory(e.target.value)} required/>
//                                     <span className='badge bg-danger mb-2'>{categoryErr}</span>
//                                 </div>
//                             </div>

//                         <MDBBtn className='mb-4' size='lg' onClick={handleFormSubmit}>Add Product</MDBBtn>

//                         </MDBCol>
//                             <MDBCol md='10' lg='4' className='order-1 order-lg-2 d-flex flex-column'>
//                                 <MDBBadge className='mx-2' color='danger' light>
//                                     {fileErr}
//                                 </MDBBadge>
//                                 <MDBCardImage src={file} className='rounded' fluid/>
//                                 <MDBFile label='Upload Profile Picture' id='customFile' onChange={handleproductImageUpload} />
//                         </MDBCol>

//                     </MDBRow>
//                 </MDBCardBody>
//             </MDBCard>

//         </MDBContainer>
   
//    </>
//   );
// }

// import React, {useState} from 'react';
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBRow,
//   MDBCol,
//   MDBInput,
//   MDBTextArea,
//   MDBFile,
//   MDBBadge 
// }
// from 'mdb-react-ui-kit';
// import badge from '../Assets/badge.png';
// import Header from '../Components/Header';

// export default function AddProduct() {

//     let loginUser = JSON.parse(localStorage.getItem("userInfo"));
//   let vendor_id = loginUser["id"];

//   const [ProductImage, setProductImage] = useState();
//   const [file, setFile] = useState(badge);
//   const [error, setError] = useState(null);
//   const [res, setRes] = useState();

//    // Function to handle imageUpload
//    const handleProductImage = (e) => {  
//        let image = e.target.files[0];
//        if(image.type === "image/jpeg" || image.type === "image/jpg" || image.type === "image/png") {
//            if(image.size >= 3*1024*1024) {
//                setError("Image size is too large");
//            } else {
//                setFile(URL.createObjectURL(image));
//                setProductImage(image);
//                setError("");
//            }
//        } else {
//            setError("File type is not supported");
//        }
//    }

//    const [productInput, setProductInput] = useState({
//     product_name: "",
//     product_desc: "",
//     initial_price: "",
//     selling_price: "",
//     quantity: "",
//     category: "",
//    });

//    const {product_name, product_desc, initial_price,selling_price, quantity, category} = productInput;

//    function handleInputChange(e) {
//     setProductInput({...productInput, [e.target.name]:e.target.value});
//    }

//    async function hanldleFormSubmit(){
//     let formData = new FormData();
//     formData.append('product_name', product_name);
//     formData.append('product_desc', product_desc);
//     formData.append('initial_price', initial_price);
//     formData.append('selling_price', selling_price);
//     formData.append('quantity', quantity);
//     formData.append('category', category);
//     formData.append('vendor_id', vendor_id);
//     formData.append('product_image', ProductImage);

//     try {
//               let result = await fetch("http://localhost:8000/api/addproduct", 
//                 formData,
//                 {
//                     headers: {
//                         "Content-Type":"multipart/form-data"
//                      },
//                 }
//               );
//              setRes("Product Successfully Added");
//              setError("");
//              console.log(result.data);
            
//             } catch (error) {
//             console.log(error);
//             setError("Product Registration Failed");

//             if(error.response.data){
//                 console.log(error.response.data);
//             }
//         }
//    }
//   return (
//     <>
//         <Header/>
//         <MDBContainer fluid>

//         <MDBRow className='d-flex justify-content-center align-items-center'>

//             <MDBCol lg='8'>

//             <MDBCard className='my-5 rounded-3' style={{maxWidth: '600px'}}>

//             <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Add Product</h3>
//             <span className='badge bg-success mb-2'>{res}</span>

//                 <MDBCardBody className='px-5'>

                
                
//                 <MDBCol md='10' lg='4' className='order-1 order-lg-2 d-flex flex-column'>
//                         <MDBBadge className='mx-2' color='danger' light>
//                             {error}
//                         </MDBBadge>
//                         <MDBCardImage src={file} className='rounded' fluid/>
//                         <MDBFile label='Add Product' id='customFile' onChange={handleProductImage} />
//                 </MDBCol>

//                 <MDBInput wrapperClass='mb-4' label='Product Name' id='form1' type='text'  name='product_name' value={product_name} onChange={handleInputChange} required/>

//                 <MDBTextArea wrapperClass='mb-4' label="Product Description" id="textAreaExample" rows="{4}"  name='product_desc' value={product_desc} onChange={handleInputChange} required/>

//                 <MDBRow>
//                     <MDBCol md='6'>
//                       <MDBInput wrapperClass='mb-4' label='Initial Price' id='form1' type='number' min="0"  name="initial_price" value={initial_price} onChange={handleInputChange} required/>
//                     </MDBCol>
//                     <MDBCol md='6'>
//                       <MDBInput wrapperClass='mb-4' label='Selling Price' id='form1' type='number' min="0" name="selling_price" value={selling_price} onChange={handleInputChange} required/>
//                     </MDBCol>
//                 </MDBRow>

//                 <MDBRow>
//                     <MDBCol md='6'>
//                       <MDBInput wrapperClass='mb-4' label='Quantity' id='form1' type='number' min="0" name='quantity' value={quantity} onChange={handleInputChange} required/>
                      
//                     </MDBCol>
//                     <MDBCol md='6'>
//                       <select class="form-select" aria-label="Default select example" name='category' value={category} onChange={handleInputChange} required>
//                         <option selected>Category</option>
//                         <option value="Fruits">Fruits</option>
//                         <option value="Electronic">Electronic</option>
//                         <option value="Furniture">Furniture</option>
//                         <option value="Grocery">Grocery</option>
//                       </select>
//                     </MDBCol>
//                 </MDBRow>
//                 <MDBBtn color='success' className='mb-4' size='lg' onClick={hanldleFormSubmit}>Add Product</MDBBtn>

//                 </MDBCardBody>
//             </MDBCard>

//             </MDBCol>
//         </MDBRow>

//         </MDBContainer>
//     </>
//   );
// }
