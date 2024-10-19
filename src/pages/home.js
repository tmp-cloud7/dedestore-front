import React, {useState} from "react";
import Header from "../components/Header";
import "./home.css"

const Home = () => {
    const [count, setCount] = useState(0);
    return (
        <>
            <Header/>
            <h1>Welcome To DedeStore</h1>
            <p>You've clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click Me</button>
            <button onClick={() => setCount(count - 1)}>Click Me -</button>
        </>
    )
}

export default Home;