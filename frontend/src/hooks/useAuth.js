import { useDispatch, useSelector } from "react-redux";
import { getProfileThunk, loginThunk, logoutThunk } from "../store/slice/auth.slice";

export const useAuth = () => {
  const dispatch = useDispatch();

  const {
    user,
    role,
    token,
    isAuthenticated,
    loading,
    error,
    authChecked,
  } = useSelector((state) => state.auth);


  const login = (credentials) => {
    return dispatch(loginThunk(credentials));
  };

  const getProfile = () => {
    return dispatch(getProfileThunk());
  };

  const logout = () => {
    return dispatch(logoutThunk());
  };


  return {
    user,
    role,
    token,
    isAuthenticated,
    loading,
    error,
    authChecked,
    login,
    getProfile,
    logout,
  };
};
