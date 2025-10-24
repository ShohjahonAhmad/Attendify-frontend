const Home = () => {
    return (
        <>
            <h1>Welcome to Home page</h1>
            <button className="bg-white p-5" onClick={() => localStorage.removeItem("token")}>x</button>
        </>
    )
}

export default Home