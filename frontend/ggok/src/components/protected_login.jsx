import { Navigate } from "react-router-dom";

export default function protected_login({children}) {


    let sessionStorage = window.sessionStorage;
    //if(sessionStorage.getItem("user") === null) return <Navigate to ="/intro"/>;
    

    return children;

}