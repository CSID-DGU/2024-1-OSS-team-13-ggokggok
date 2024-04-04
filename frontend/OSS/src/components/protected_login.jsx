import { Navigate } from "react-router-dom";

export default function protected_login({children}) {

   // const user = auth.currentUser;

   // if(user === null) return <Navigate to ="/login"/>;
    //return <Navigate to ="/login"/>;
    return children;

}