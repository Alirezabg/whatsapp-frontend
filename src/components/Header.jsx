
import React from 'react';

function Header() {
  return (
    <header>
            <h1>My App</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  
  );
}

export default Header;