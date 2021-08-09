import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ISignInData } from '../../../models/interfaces/ISignInData';
import { api } from '../../../service';
import ErrorAlert from '../../components/errorAlert';
import Loader from '../../components/loader';
import './style.scss';

const Auth: FunctionComponent = () => {
  const [signInData, setSignInData] = useState<ISignInData>(
    (JSON.parse(localStorage.getItem('signInData') as string) as ISignInData) || { login: '', password: '' },
  );
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const signInHandler = async () => {
    try {
      setIsLoad(true);
      setIsError(false);

      console.log(signInData);
      if (!validateData()) {
        return;
      }

      await api.authService.signInWithPassword(signInData);
      localStorage.setItem('signInData', JSON.stringify(signInData));
      window.location.replace('/home');
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoad(false);
    }
  };

  const validateData = (): boolean => {
    if (!signInData.login.length) {
      Swal.fire('Error', 'Please provide login', 'error');
      return false;
    }

    if (!signInData.password.length) {
      Swal.fire('Error', 'Please provide password', 'error');
      return false;
    }

    return true;
  };

  return (
    <>
      {isLoad && <Loader />}
      <div className='auth'>
        <form>
          <div className='form-group'>
            <label>Login</label>
            <input
              type='text'
              className='form-control'
              value={signInData.login}
              onChange={(e) =>
                setSignInData({
                  ...signInData,
                  login: (e.target as unknown as HTMLTextAreaElement).value,
                } as ISignInData)
              }
            />
          </div>

          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              className='form-control'
              value={signInData.password}
              onChange={(e) =>
                setSignInData({
                  ...signInData,
                  password: (e.target as unknown as HTMLTextAreaElement).value,
                } as ISignInData)
              }
            />
          </div>
        </form>
        <button className={'btn btn-primary button m-2'} onClick={() => signInHandler()}>
          Sign in
        </button>
        <button className={'btn btn-outline-primary button m-2'}>
          <Link to='/auth-create'>Sign up</Link>
        </button>
        {isError && <ErrorAlert />}
      </div>
    </>
  );
};

export default Auth;
