import React, { FunctionComponent } from 'react';
import './style.css';

const ErrorAlert: FunctionComponent = () => {
  return (
    <div className='alertError alert alert-danger mt-2' role='alert'>
      Something went wrong. Please try again later.
    </div>
  );
};

export default ErrorAlert;
