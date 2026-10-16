import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextapi/UserState.jsx";
import { useEffect } from "react";

function ProtectAuth({ children }) {
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  console.log(isLogin);

  useEffect(() => {
    if (!isLogin) {
      return navigate("/login");
    }
  }, [isLogin]);
  return <>{children}</>;
}

export default ProtectAuth;
