import useAuthContext from "../context/AuthContext";
import { useEffect } from "react";

const Home = () => {
    const { user, getUser } = useAuthContext();
    useEffect(() => {
        console.log(user);
        if (!user) {
            getUser();
        }
    }, []);

    return (
        <div>
            {user && (
                <div>
                    <p>User ID: {user.id}</p>
                    <p>User Name: {user.name}</p>
                    <p>User Role: {user.role}</p>
                </div>
            )}
        </div>
    );
};

export default Home;
