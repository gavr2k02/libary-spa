import { ISignInData } from '../../models/interfaces/ISignInData';

export interface IAuthService {
  signInWithPassword(signInData: ISignInData): Promise<void>;
  createSignInData(signInData: ISignInData): Promise<void>;
  get isToken(): boolean;
}
