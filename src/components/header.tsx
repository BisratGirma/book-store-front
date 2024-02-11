import { useNavigate } from "react-router";
import styled from "styled-components";
import { useStore } from "../store";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.7); /* half transparent white */
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: black;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
`;

const MenuItem = styled.div`
  margin: 10px;
  font-size: 18px;
  color: black;
  cursor: pointer;

  @media (max-width: 768px) {
    /* for mobile devices */
    ${Menu} {
      justify-content: center;
      width: 100%;
    }
  }
`;

const Orders = styled(MenuItem)``;
const SignOut = styled(MenuItem)``;
const Login = styled(MenuItem)``;
const Signup = styled(MenuItem)``;

function HeaderComponent() {
  const navigate = useNavigate();
  const authenticated = useStore((state: any) => state.user.jwt);
  const points = useStore((state: any) => state.user.points);
  const removeToken = useStore((state: any) => state.removeToken);

  return (
    <Header>
      <Logo>Book Store</Logo>
      <Menu>
        {authenticated ? (
          <>
            <MenuItem>{points + " pionts" ?? ""}</MenuItem>
            <Orders onClick={() => navigate("/my-orders")}>My Orders</Orders>
            <SignOut onClick={() => removeToken()}>Sign Out</SignOut>
          </>
        ) : (
          <>
            <Login onClick={() => navigate("/login")}>Login</Login> |{" "}
            <Signup onClick={() => navigate("/signup")}>Signup</Signup>
          </>
        )}
      </Menu>
    </Header>
  );
}

export default HeaderComponent;
