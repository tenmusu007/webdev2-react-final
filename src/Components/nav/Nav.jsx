import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from './AuthContext';
import "./nav.css";

const Nav = () => {
   const {user, logOut, googleSignIn} = UserAuth();

   const handleSignOut = async () => {
      try {
         await logOut();
      } catch(error) {
         console.log(error);
      }
   }

   const handleSignIn = async () => {
      // const {googleSignIn} = UserAuth();
      try {
         await googleSignIn();
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