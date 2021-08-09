import React, { FunctionComponent } from 'react';
import './style.css';

const LoadAlert: FunctionComponent = () => {
  return (
    <div className='alertError alert alert-primary' role='alert'>
      Please wait...
    </div>
  );
};

export default LoadAlert;
