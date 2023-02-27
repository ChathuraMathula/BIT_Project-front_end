import React, { useContext } from "react";
import { UserLoginContext } from "../../context/Context";

const UserProfile = (props) => {
    const login = useContext(UserLoginContext);

    return (
        <>
        <h1>{login.user.role} profile</h1>
        </>
    );
};

export default UserProfile;