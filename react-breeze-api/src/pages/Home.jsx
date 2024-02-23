import useAuthContext from "../context/AuthContext";
import {useEffect} from "react";

const Home = () => {
    const {user, getUser } = useAuthContext();
    useEffect(()=>{
        if(!user){
            getUser();
        }
    },[]);
    return <div>{user ?.name}</div>;
};

export default Home;