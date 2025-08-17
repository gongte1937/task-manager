import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} from '../api/authApi';
import { storage } from '../../../shared/utils';

export const useAuth = () => {
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await login({ email, password }).unwrap();
      storage.set('token', result.access_token);
      storage.set('user', result.user);
      return result;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const handleRegister = async (
    email: string,
    password: string,
    name: string
  ) => {
    try {
      const result = await register({ email, password, name }).unwrap();
      storage.set('token', result.access_token);
      storage.set('user', result.user);
      return result;
    } catch (error) {
      console.error('Register failed:', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      storage.remove('token');
      storage.remove('user');
    }
  };

  const getToken = () => storage.get<string>('token');
  const getUser = () => storage.get<any>('user');
  const isAuthenticated = () => !!getToken();

  return {
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    getToken,
    getUser,
    isAuthenticated,
    isLoginLoading,
    isRegisterLoading,
    isLogoutLoading,
  };
};
