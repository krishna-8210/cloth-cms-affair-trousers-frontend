
import SecuredRoutes from "@/SecuredRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AuthForm from "./components/forms/AuthForm";
import { isAuthenticated } from "./libs/token";
import { logout, makelogin } from "./redux/AuthSlice";
// import './styles/base.css'
import './styles/embla.css'
import  Navbar  from "./components/Navbar";

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const login = useSelector((e:any) => e?.authslice?.isLogin);
  const dispatch=useDispatch();
  console.log(login);
  // console.log(login)

// login check
useEffect(() => {
   if(isAuthenticated()){
    const token = localStorage.getItem('token');
    dispatch(makelogin(''));
   }
   else{
    console.log("user is not authenticated");
    dispatch(logout(''));
   }
  }, [login]);

  return (
    <>

     { login?<div className=" w-screen h-screen flex">
        <div className="w-16 h-screen ">
          <Navbar navOpen={navOpen} setNavOpen={setNavOpen} />
        </div>
        <div className=" w-full ">

          <SecuredRoutes />

        </div>
      </div>:<div className="w-screen h-screen flex">
      <AuthForm/>

      </div>
}


    </>
  );
}

export default App;
