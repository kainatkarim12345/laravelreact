import useAuthContext from "../../context/AuthContext";
import {useEffect} from "react";

const AdminDashboard = () => {
    const {user, getUser } = useAuthContext();
    useEffect(()=>{
        if(!user){
            getUser();
        }
    },[]);
    return <div>hiiiiiiiiiiiiiiiiiiiiii</div>;
};

export default AdminDashboard;