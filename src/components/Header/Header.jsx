import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/loginSlice";
import { useHistory } from "react-router-dom";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";

export default function Header() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.login.isAuth);
  const history = useHistory();

  const logoutFn = () => {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TEST APP
          </Typography>
          {!isAuth ? (
            <Button color="inherit">
              <Link className="login_btn" to="/login">
                Login
              </Link>
            </Button>
          ) : (
            <Button onClick={logoutFn} color="inherit">
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
