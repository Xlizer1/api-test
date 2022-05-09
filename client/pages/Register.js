import Link from 'next/link'
import { useState } from 'react';
import axios from 'axios';

function Register() {
    const [ user, setUser] = useState({
        username:'',
        email:'',
        password:''
    });
    
    const handleChange = e => {
        e.preventDefault();
        
        const newUser ={...user}
        newUser[e.target.id] = e.target.value
        setUser(newUser)
        console.log(newUser);
    }

  async function registerUser (event) {
      event.preventDefault();

      const response = await axios.post("http://localhost:4000/register", user)
      .then(res => {
          if(res.data.__v === 0){
            window.location.assign('/Login')
          } else {
              alert(res.data)
          }
      })
  }
  return (
      <div className='registerForm'>
        <form method='POST'>
            <h1>Register</h1>
            <div>
                <label>Username</label>
                <input 
                    value={ user.username }
                    id='username'
                    onChange= { handleChange }
                    type='username'
                    placeholder='username' 
                />
            </div>
            <div>
                <label>Email</label>
                <input 
                    value={ user.email }
                    id='email'
                    onChange= { handleChange }
                    type='email'
                    placeholder='email' 
                />
            </div>
            <div>
                <label>Passowrd</label>
                <input 
                    value={ user.password }
                    id='password'
                    onChange= { handleChange }
                    type='password'
                    placeholder='password'
                />
            </div>
            <button className='input' type='submit'onClick={(event) => registerUser(event) }>Register</button>
        </form>
        <label><span>you already have an account? </span><Link href='/Login'><a>Login</a></Link></label>
      </div>
  )
}

export default Register