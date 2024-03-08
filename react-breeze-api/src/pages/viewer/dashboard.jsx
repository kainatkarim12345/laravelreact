import useAuthContext from "../../context/AuthContext";
import {useEffect} from "react";

const ViewerDashboard = () => {
    const {user, getUser } = useAuthContext();
    useEffect(()=>{
        if(!user){
            getUser();
        }
    },[]);
    return <div>viewer dash</div>;
};

export default ViewerDashboard;