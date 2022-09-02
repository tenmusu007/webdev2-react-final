import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from './AuthContext';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import "./nav.css";

const Nav = () => {
   const { user, logOut, googleSignIn, count, setCount, isLogin, setIsLogin } = useContext(AuthContext);
   console.log("Auth", user);

   const handleSignOut = async () => {
      try {
         await logOut();
         await setCount(count + 1)
         await setIsLogin(!isLogin)
      } catch(error) {
         console.log(error);
      }
   }

   const handleSignIn = async () => {
      // const {googleSignIn} = UserAuth();
      try {
         await googleSignIn();
         await setCount(count + 1)
         await setIsLogin(!isLogin)
      } catch (error) {
         console.log(error);
      }

   }

   return (
      <div className='navbar'>
         <h1 className="title">
            Fridgefy
         </h1>
         <h3>
               {user?.displayName ? "Hello, " + user.displayName + "!": ""}
         </h3>
         <div className='links'>
            <Link className='link' to='/recipes'>Recipes</Link>
            {user?.displayName ? <Link className='link' to='/MyshoppingList'>My Shopping List</Link> : ""}
            
            <div className='login'>
               {user?.displayName ? <button onClick={handleSignOut}>Logout</button> : <button onClick={handleSignIn}>LogIn</button>}
            </div>
         </div>
         
      </div>
   )
}

export default Nav;