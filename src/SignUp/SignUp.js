import React, { useEffect,useState,useContext,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../SignUp/AuthProvider';
import axios from 'axios';
import '../App.css';
const LOGIN_URL = 'http://192.168.1.208:2024/register';

export default function SignUp() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const [fullname,setFullName]= useState('');
  const [email, setUser] = useState('');
  const [password, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  
	 const handleLogin= ()=>{
        navigate('/')
     }
 
 useEffect(()=>{
  userRef.current.focus();
 },[])
 useEffect(()=>{
  setErrMsg('');
 }, [fullname,email,password])
  const handleSubmit = async (e) => {

    try {
        const response = await axios.post(LOGIN_URL,
            { fullname,email, password }
        );
        
        console.log((response));
        const accessToken = response?.data?.accessToken;

        const roles = response?.data?.roles;

        setAuth({ fullname,email, password, roles, accessToken });
        setUser('');
        setPwd('');
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Email or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('SignUp Failed');
        }
        errRef.current.focus();
    }
}


  return (
   
    <div className='container mt-5'>
    <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign Up Form</h1>
                     <form >
                     <label htmlFor="username">FullName:</label>
                     <input
                         type="text"
                          id="fullname"
                         autoComplete="off"
                          onChange={(e) => setFullName(e.target.value)}
                         value={fullname}
                          required
                     />

                        <label htmlFor="Email">Email:</label>
                        <input
                            type="Email"
                             id="Email"
                           ref={userRef}
                            autoComplete="off"
                             onChange={(e) => setUser(e.target.value)}
                            value={email}
                             required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={password}
                            required
                        />
                        <button type='button' onClick={handleSubmit}>Submit</button>
                        <button type='button' onClick={handleLogin}>LogIn</button>
                    </form>
                </section>
    </div>
  )

  


}




