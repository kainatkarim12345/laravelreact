import useAuthContext from "../context/AuthContext";

const Home = () => {
    const {user } = useAuthContext();
    return <div>{user ?.name}</div>;
};

export default Home;