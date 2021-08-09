import React, { FunctionComponent } from 'react';
import './style.css';

const SucsessAlert: FunctionComponent = () => {
  return (
    <div className='alertError alert alert-success mt-2' role='alert'>
      Sucsess!
    </div>
  );
};

export default SucsessAlert;
