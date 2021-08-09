import { IRequestConfig } from '../../models/interfaces/IRequestConfig';
import { ISignInData } from '../../models/interfaces/ISignInData';
import { RequestService } from '../request-service';
import { IAuthService } from './IAuthService';

const TIME_TO_REMOVE_LOCALSTORAGE: number = 30 * 60 * 1000;

export class AuthService extends RequestService implements IAuthService {
  private _timer: number = 0;

  public async signInWithPassword(signInData: ISignInData): Promise<void> {
    const config: IRequestConfig = {
      method: 'post',
      data: signInData,
      service: 'auth/password',
    };
    const token: string = await this.sendRequest(config, true);
    localStorage.setItem('authorization-token', token);
    this.deleteToken();
  }

  public async createSignInData(signInData: ISignInData): Promise<void> {
    const config: IRequestConfig = {
      method: 'post',
      data: signInData,
      service: 'auth/password/create',
    };
    const token: string = await this.sendRequest(config, true);
    localStorage.setItem('authorization-token', token);
    this.deleteToken();
  }

  public get isToken(): boolean {
    return this.isToken;
  }

  private deleteToken(): void {
    clearTimeout(this._timer);

    this._timer = setTimeout(() => {
      localStorage.removeItem('authorization-token');
    }, TIME_TO_REMOVE_LOCALSTORAGE);
  }
}
