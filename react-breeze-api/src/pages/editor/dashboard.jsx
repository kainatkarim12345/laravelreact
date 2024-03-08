import useAuthContext from "../../context/AuthContext";
import {useEffect} from "react";

const EditorDashboard = () => {
    const {user, getUser } = useAuthContext();
    useEffect(()=>{
        if(!user){
            getUser();
        }
    },[]);
    return <div>editorrrrrrrr</div>;
};

export default EditorDashboard;