import React from 'react'
import { Link } from 'react-router-dom';

const ErrorPageComponent = () => {

  return (
    <div id="main">
      <div className="fof">
        <h1>Error 404</h1>
        <Link to='/'>Back to Home page</Link>
      </div>
    </div>
  );
}

export default ErrorPageComponent