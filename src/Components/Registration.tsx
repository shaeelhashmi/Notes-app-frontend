
import { Link } from 'react-router-dom';
import InputTags from './InputTags.tsx';
import React,{ FormEvent,useState,useEffect } from 'react'
import Google from './SVG/Google.tsx';
import Side from './Side.tsx';
export default function Registration() {
  const [error,setError]=useState('')
  const IsEmpty=(username:String,password:String):boolean=>{
    if(username.length===0 || password.length===0){
      return true
    }
    return false
  } 
  const IsEmptySpaces=(username:String):boolean=>{
    if(username.trim().length===0){
      return true
    }
    return false;
  }
  const Submit:React.FormEventHandler<HTMLFormElement> = (e:FormEvent<HTMLFormElement>) => {
    const Form=e.currentTarget;
    let username = (Form.elements.namedItem('username') as HTMLInputElement).value;
    let password = (Form.elements.namedItem('password') as HTMLInputElement).value;
    let CheckPass = (Form.elements.namedItem('CheckPass') as HTMLInputElement).value;

    e.preventDefault();
    if(password!==CheckPass){
      setError('Passwords do not match')
      return;
    }
    if(IsEmpty(username,password)){
      setError('Please fill all the fields')
      return;
    }
    if(IsEmptySpaces(username)){
      setError('Username cannot be empty spaces')
      return;
    }
    try{
    fetch('/register',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        username:username,
        password:password
      })
    }).then(res =>{
      return res.json()})
    .then(data => {
      if(data.message==="User Created"){
        window.location.href='/login'
      }
      setError(data.message)
    })}catch{
          setError('Something went wrong')
    } 
  }
  useEffect(() => {
    setError('');
  },[])
  const handlePass=(e:React.FormEvent<HTMLInputElement>)=>{
    if(e.currentTarget.value.length>30){
      e.currentTarget.value = e.currentTarget.value.slice(0,30);
      setError('Password cannot be more than 30 characters')
    }else{
      setError('')
    }
  }
  const handleChange = (e:React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.toLowerCase();
    e.currentTarget.value = e.currentTarget.value.split(" ").join("");
    if(e.currentTarget.value.length>20){
      e.currentTarget.value = e.currentTarget.value.slice(0,20);
      setError('Username cannot be more than 20 characters')
    }else{
      setError('')
    }
   }
  return (
    <>
       <div className='grid min-h-screen grid-cols-1 lg:grid-cols-2 color place-content-center ' >
       <div className=' text-white  p-14 w-[550px]   h-full mx-auto '>
      <h1 className='font-serif text-3xl text-center lg:hidden'>Welcome to Notes App 
        <br></br><span className='text-base'>An easy way to manage your notes Signup or login to continue</span></h1>
       <div className='flex'>
      <a href="/auth/google/callback" className='mx-auto mt-6  bg-[#0B032D] w-[300px] h-[50px] text-center p-3 rounded-md hover:bg-[#11044d] transition-all duration-500 text-white justify-self-center'><Google></Google><span className='ms-5'>Login with Google</span></a>
      </div>
      <h1 className='font-serif text-3xl text-center mt-11'>Sign Up</h1> 
      <form action="/register" method="post" onSubmit={Submit}>
        <div className='flex flex-col'> 
          <InputTags name={"username"} label={"Username:"} type={"text"} placeholder={"Username"} function={handleChange}></InputTags>
          <InputTags name={"password"} label={"Password: "} type={"password"} placeholder={"Password"} function={handlePass}></InputTags>
          <InputTags name={"CheckPass"} label={"Confirm password: "} type={"password"} placeholder={"Password"} function={handlePass}></InputTags>
        </div> 
        <div className='h-6 mt-5 text-sm text-red-500'>{error}</div>
        <div className="flex">
        <button type="submit" className='w-[300px] h-[50px] bg-[#0B032D] mt-6 mx-auto  transition-all duration-500 rounded-md text-white hover:bg-[#11044d]'>SignUp</button>
        </div>    
      </form>
      <Link to="/login" className='text-[0.6rem] mt-7'>Already have an account? Login</Link>

  </div>
  <Side></Side>
  </div>
    </>
  );
}
