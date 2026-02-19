
import React, { useState } from 'react'
import ModalPopup from '../themes/ModalPopup'
import { Form, Input, Button, Switch } from "@heroui/react";
import PassowordInput from '../ui/PassowordInput';
import { api_manager_v2, responseHandler } from '@/libs/api_handle';
import { loginService, signupService } from '@/services/authService';
import { CustomToast, custom_add_toast } from '../ui/CustomToast';
import { addToast } from "@heroui/react";
import { makelogin } from '@/redux/AuthSlice';
import { useDispatch } from 'react-redux';
const LoginForm = ({ changeform }:any) => {
  const [action, setAction] = React.useState<string|null>(null);
  const [loading, setLoading] = React.useState(false);
  const [serverData, setServerData] = React.useState(null);
  const dispatch = useDispatch();
  const submitHandler = async (e: any) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));

    setLoading(true);
    try {
      console.log(data)
      if (data.force_login!=undefined) {
        console.log('forcelogin')
        localStorage.setItem('token', 'dummy_token')
        dispatch(makelogin(''));
        return;
      }
      const resp = await responseHandler(loginService, data);
      console.log(resp);
      setLoading(false);
      localStorage.setItem('token', resp.data.token)
      if (resp.status == true) {
        dispatch(makelogin(''));
      }
      setLoading(false);


    } catch (error) {
      console.error('Login failed:', error);
    }
    // try {
    //   const resp: any = await api_manager_v2(loginService, data);
    //   setLoading(false);
    //   setServerData(resp);
    //   console.log(resp);
    //   if(resp.error==false)
    //   custom_add_toast({
    //     title: "Login Successful",
    //     description: "Welcome back! You are now logged in.",
    //   });
    //   else{
    //     custom_add_toast({
    //       title: "Login Failed",
    //       description: resp.message || "Invalid email or password.",
    //     });
    //     setLoading(false);
    //     console.error(resp.message);
    //   }
    // } catch (error) {
    //     custom_add_toast({
    //     title: "Login Failed",
    //     description: "Invalid email or password.",
    //   });
    //   setLoading(false);
    //   console.log(error);
    // }

  }


  return <>
    <Form
      className="w-full  max-w-[500px] flex flex-col gap-4 p-5 justify-center items-center shadow-2xl  rounded-xl"
      onReset={() => setAction("reset")}
      onSubmit={submitHandler}
    >
      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
      />

      <PassowordInput title_position={'outside'} />
      <Switch name='force_login' />
      <div className="flex gap-2">
        <Button isLoading={loading} color="primary" type="submit">
          Submit
        </Button>
      
      </div>
      {action && (
        <div className="text-small text-default-500">
          Action: <code>{action}</code>
        </div>
      )}
    </Form>
  </>

}

const SignupForm = ({ changeform }:any) => {
  const [action, setAction] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const submitHandler = async (e: any) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));

    setLoading(true);
    try {
      const resp = await responseHandler(signupService, data);
      console.log(resp);
      setLoading(false);
    } catch (error) {
      console.error('Signup failed:', error);
    }

  }

  return <>
    <Form
      className="w-full  max-w-xs flex flex-col gap-4 p-5 justify-center items-center shadow-2xl border-gray-200 border-2 rounded-xl"
      onReset={() => setAction("reset")}
      onSubmit={submitHandler}
    >
      <Input
        isRequired
        errorMessage="Please enter a valid username"
        label="Name"
        placeholder='your name'
        name="name"
        labelPlacement="outside"
        type="text"
      />

      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"

        placeholder="Enter your email"
        type="email"
      />
      <Input
        isRequired
        errorMessage="Please enter a valid username"
        label="Mobile"
        name="mobile"
        labelPlacement="outside"
        placeholder='your mobile no.'
        type="text"
      />
      <PassowordInput title_position={'outside'} />
      <div className="flex gap-2">
        <Button isLoading={loading} color="primary" type="submit">
          Submit
        </Button>
        <Button onClick={() => {
          changeform('login')
        }} variant="flat">
          Login
        </Button>
      </div>
      {action && (
        <div className="text-small text-default-500">
          Action: <code>{action}</code>
        </div>
      )}
    </Form>
  </>

}

function AuthForm() {
  const [formType, setFormType] = useState('login')


  return (
    <>
      <CustomToast toast_center={true} />
      <div className='w-full h-full    justify-center items-center justify-self-center flex flex-col gap-4'>
       
          <LoginForm changeform={setFormType} />
        

      
      </div>
    </>
  )
}

export default AuthForm