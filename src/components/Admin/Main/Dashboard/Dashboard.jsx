import React from 'react';
import {
  AppBar,
  Badge,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BarChartIcon from "@material-ui/icons/BarChart";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LayersIcon from "@material-ui/icons/Layers";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PeopleIcon from "@material-ui/icons/People";
import CategoryIcon from "@material-ui/icons/Category";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import clsx from "clsx";
import {
  Link,
  Redirect,
  Route,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import Products from "./Products/Products";
import Categories from "./Categories/Categories";
import { logout } from "../../../../redux/actions/authAction"
import { useDispatch } from 'react-redux';
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

const drawerWidth = 240;

const style = {
  textDecoration: "inherit",
  color: "inherit",
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

function Dashboard({ auth }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  let { url } = useRouteMatch();
  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  function onHandleLogout() {
    dispatch(logout())
    history.push("/");
  }

  const isAdmin = () => {
    const { accessToken } = auth || {};
    const userInfo = jwt_decode(accessToken);
    const { role = "user" } = userInfo;
    if (accessToken && role === 'admin') {
      return true;
    }
    return false;
  }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const element =
    isAdmin() ? (
      <React.Fragment>
        <CssBaseline />
        <ToastContainer />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <button className='admin__button--logout' onClick={onHandleLogout}>Logout</button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <Link to={`${url}`} style={style}>
                <ListItemText primary="Dashboard" />
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <Link to={`${url}/orders`} style={style}>
                <ListItemText primary="Orders" />
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <Link to={`${url}/customers`} style={style}>
                <ListItemText primary="Customers" />
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <Link to={`${url}/reports`} style={style}>
                <ListItemText primary="Reports" style={style} />
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <Link to={`${url}/integrations`} style={style}>
                <ListItemText primary="Integrations" />
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <Link to={`${url}/categories`} style={style}>
                <ListItemText primary="Categories" />
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <CardGiftcardIcon />
              </ListItemIcon>
              <Link to={`${url}/products`} style={style}>
                <ListItemText primary="Products" />
              </Link>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Route path="/admin" exact>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                  <Paper className={fixedHeightPaper}>
                    <Chart />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <Paper className={fixedHeightPaper}>
                    <Deposits />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Orders />
                  </Paper>
                </Grid>
              </Grid>
            </Route>
            <Route path={`${url}/orders`}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={fixedHeightPaper}>
                  <Orders />
                </Paper>
              </Grid>
            </Route>
            <Route path={`${url}/customers`}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={fixedHeightPaper}>
                  <Deposits />
                </Paper>
              </Grid>
            </Route>
            <Route path={`${url}/reports`}>
              <h2>This is component Reports</h2>
            </Route>
            <Route path={`${url}/integrations`}>
              <h2>This is component Integrations</h2>
            </Route>
            <Route path={`${url}/categories`}>
              <Grid item xs={12} md={12} lg={12}>
                <Categories />
              </Grid>
            </Route>
            <Route path={`${url}/products`}>
              <Grid item xs={12} md={12} lg={12}>
                <Products />
              </Grid>
            </Route>
          </Container>
        </main>
      </React.Fragment>
    ) : (
      <Redirect to="/" />
    );

  return <div className={classes.root}>{element}</div>;
}

function mapStateToProps(state) {
  const {
    auth: { data },
  } = state;
  return { auth: data };
}

export default connect(mapStateToProps)(Dashboard);