import React from 'react';
import { Link } from 'react-router-dom';

const FooterComponent = () => {
  return (
    <footer className="my-footer">
      <small>
        &copy; 2023 Zurea Shop by
        <Link target="noreferrer" href="https://webdevelopermaxi.eu.org">
          <span> Maxi </span>
        </Link>
        . All Rights Reserved.
      </small>
    </footer>
  );
}

export default FooterComponent;
