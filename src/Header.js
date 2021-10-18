import React from 'react';
import './Golf.css';

const Header = ({userEmail, signOut}) => {
  return (
    <header id="stga-header" className="container-header">
        <div className="stga-title">STGA Tour</div>
        {userEmail !== null ?      
            <div className="sign-out-btn">
                <div className="userEmail"> {userEmail} </div>
                <button onClick={signOut}> Sign Out </button>
                {/* {(Object.keys(user2).length === 0 && user2.constructor === Object) ?
                null :
                user2.name.split(' ').slice(0, 1).join(' ')
                } */}
            </div> 
            : <div></div>
        }
    </header>
  );
}

export default Header;