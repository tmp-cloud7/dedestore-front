import React, {useEffect, useState} from "react";
import Header from "../Components/Header";

export default function Home() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            let response = await fetch("http://localhost:8000/api/productlist");
            let result = await response.json();
            setData(result);
            console.log(data);
        } catch (error) {
            console.log("Failed to fetch data", error);
        }
    }
    useEffect(()=>{
        fetchData();
    }, []);

    console.log(data)
    return (
        <>
            <Header/>
            <h1>Welcome To DedeStore</h1>
            <p>You clicked times</p>
        </>
    )
}