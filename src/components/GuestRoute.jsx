import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextapi/UserState.jsx";
import { useEffect } from "react";

function GuestRoute({ children }) {
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  console.log(isLogin);

  useEffect(() => {
    if (isLogin) {
      return navigate("/");
    }
  }, [isLogin]);
  return <>{children}</>;
}

export default GuestRoute;
