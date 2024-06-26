import { useState } from "react";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import profileLogo from "../../assets/profile.png";
import Avatar from "@mui/material/Avatar";
import { FormComponent, AdminFormView, UserFormView } from "../../components";
import {
  Container,
  styled,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import style from "./dashboard.module.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "fixed",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [selectedView, setSelectedView] = useState("Dashboard");

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleViewClick = (view) => {
    setSelectedView(view);
    setOpen(false); // Close the drawer when a view is selected
  };

  const [form, setForm] = useState([
    { Element: "Context", Indicator: [] },
    { Element: "Planning", Indicator: [] },
    { Element: "Input", Indicator: [] },
    { Element: "Process", Indicator: [] },
    { Element: "Output", Indicator: [] },
    { Element: "Outcome", Indicator: [] },
  ]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex", backgroundColor: "-moz-initial" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar
            sx={{
              backgroundColor: "#d08630",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{ marginRight: "36px" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              MEE TR
            </Typography>
            <Avatar src={profileLogo} />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              justifyContent: "flex-end",
              pr: "240px",
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            <ListItemButton
              onClick={() => handleViewClick("Dashboard")}
              selected={selectedView === "Dashboard"}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton
              onClick={() => handleViewClick("Admin Form View")}
              selected={selectedView === "Admin Form View"}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Admin Form View" />
            </ListItemButton>
            <ListItemButton
              onClick={() => handleViewClick("User Form View")}
              selected={selectedView === "User Form View"}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="User Form View" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            transition: "margin-left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
            marginLeft: open ? `${drawerWidth}px` : 0,
            width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
          }}
        >
          <Toolbar />
          <Container
            maxWidth="xl"
            sx={{
              p: "20px",
              width: "auto",
              marginLeft: !open && "70px",
              transition: "margin-left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
            }}
          >
            <div className={style.container}>
              {selectedView === "Dashboard" && (
                <FormComponent form={form} setForm={setForm} />
              )}
              {selectedView === "Admin Form View" && (
                <AdminFormView form={form} setForm={setForm} />
              )}
              {selectedView === "User Form View" && (
                <UserFormView form={form} />
              )}
            </div>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
