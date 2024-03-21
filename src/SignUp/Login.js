import React, { useEffect,useState,useContext,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../SignUp/AuthProvider';
import axios from 'axios';
import '../App.css';
const LOGIN_URL = 'http://192.168.1.208:2024/login';
// window.location.href = `http://http://192.168.1.208:2024/login`;

export default function Login() {

  useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const [email, setUser] = useState('');
  const [password, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  function SignUp(){
    navigate('/SignUp')
  }

 useEffect(()=>{
  userRef.current.focus();
 },[])
 useEffect(()=>{
  setErrMsg('');
 }, [email,password])

  const handleSubmit = async (e) => {
    try {
        const response = await axios.post(LOGIN_URL,
           { email, password }
        );
        console.log(response?.data);
        localStorage.setItem('token', response.data['acsess token']);

        setUser('');
        setPwd('');
       
    } catch (err) {
      console.log(err)
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Email or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        errRef.current.focus();
    }
    navigate("/Module")
}
  

  return (
   
    <div className='container mt-5'>
    <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Log In Form</h1>
                     <form >
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
                        <button type='button' onClick={handleSubmit}>Log In</button>
                        <button type='button' onClick={SignUp}>SignUp</button>
                    </form>
                </section>
    </div>
  )

  


}




