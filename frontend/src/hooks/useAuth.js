import { useDispatch, useSelector } from "react-redux";
import { loginThunk, logout } from "../store/slice/auth.slice";

export const useAuth = () => {
  const dispatch = useDispatch();

  const {
    user,
    role,
    token,
    isAuthenticated,
    loading,
    error,
  } = useSelector((state) => state.auth);


  const login = (credentials) => {
    return dispatch(loginThunk(credentials));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    user,
    role,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    logout: logoutUser,
  };
};
