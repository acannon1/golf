import React from 'react';
import './Golf.css';

const Header = ({user, user2, signOut}) => {
  return (
    <header id="stga-header" className="container-header">
        <div className="stga-title">STGA Tour</div>
        {user !== null ?      
            <div className="sign-out-btn">
              <button onClick={signOut}>Sign Out</button>
              {(Object.keys(user2).length === 0 && user2.constructor === Object) ?
                null :
                user2.name.split(' ').slice(0, 1).join(' ')
              }
            </div> 
        : <div></div>
        }
    </header>
  );
}

export default Header;