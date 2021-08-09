import axios from 'axios';
import { API_URL } from '../../models/common';
import { IRequestConfig } from '../../models/interfaces/IRequestConfig';

export abstract class RequestService {
  private _token: string = JSON.stringify(localStorage.getItem('authorization-token'));

  protected async sendRequest(config: IRequestConfig, ignoreToken = false): Promise<any> {
    try {
      if (this._token === 'null' && !ignoreToken) {
        throw 'Token is null';
      }

      config = {
        ...config,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + this._token,
        },
        url: `${API_URL}${config.service}`,
      };

      const res = await axios(config as any);
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  protected get isToken(): boolean {
    return !!this._token;
  }
}
