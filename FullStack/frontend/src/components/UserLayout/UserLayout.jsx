import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import LogoutIcon from "@mui/icons-material/Logout";
import { Row, Col, Button } from "react-bootstrap";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const drawerWidth = 240;

function UserLayout(props) {
  const { user, logout, changeAdmin } = useUser();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <h1 className="p-3 mb-0">EngageWise</h1>
      {/* <Divider /> */}
      <Toolbar />
      <List>
        <ListItem
          onClick={() => navigate(`/dashboard/${user.id}`)}
          key="Dashboard"
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem
          onClick={() => navigate("/courses")}
          key="Courses"
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Courses" />
          </ListItemButton>
        </ListItem>

        <ListItem
          onClick={() => {
            logout();
            navigate("/");
          }}
          key="logout"
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
      {/* <Divider /> */}
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "linear-gradient(to left, #C39393,#0F0F5F, #0F0F5F)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <Row>
              <Col>
                <Typography variant="h6" noWrap component="div">
                  Welcome {user.name}
                </Typography>
              </Col>
              {/* <Col>
                {user.isAdmin ? (
                  <Button
                    onClick={() => {
                      changeAdmin();
                    }}
                  >
                    Swith to User
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      changeAdmin();
                    }}
                  >
                    Swith to Admin
                  </Button>
                )}
              </Col> */}
            </Row>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {/* <UserCard user={userDetails} /> */}
        <Outlet />
        {/* <Dashboard /> */}
      </Box>
    </Box>
  );
}

// UserLayout.propTypes = {
//   window: PropTypes.func,
// };

export default UserLayout;
