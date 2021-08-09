import React, { FunctionComponent, useState } from 'react';
import Swal from 'sweetalert2';
import { ISignInData } from '../../../models/interfaces/ISignInData';
import { api } from '../../../service';
import ErrorAlert from '../../components/errorAlert';
import Loader from '../../components/loader';
import './style.scss';

const AuthCreate: FunctionComponent = () => {
  const [signInData, setSignInData] = useState<ISignInData>(
    (JSON.parse(localStorage.getItem('signInData') as string) as ISignInData) || { login: '', password: '' },
  );
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const signInHandler = async () => {
    try {
      setIsLoad(true);
      setIsError(false);

      if (!validateData()) {
        return;
      }

      await api.authService.createSignInData(signInData);
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
              type='text'
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
        <button className={'btn btn-outline-primary button m-2'} onClick={() => signInHandler()}>
          Sign up
        </button>
        {isError && <ErrorAlert />}
      </div>
    </>
  );
};

export default AuthCreate;
