// @desc      Navbar Component
// @route     Used in all Routes
// @access    Private/Public different for both

import React, { useEffect,useState } from 'react'
import {AppBar, Badge, InputBase, makeStyles, Toolbar, Typography,Button } from '@material-ui/core'
import {Cancel, LocalMall, Mail,  Person,PersonOutline, Search,ExitToApp,Storefront,ShoppingCartOutlined} from '@material-ui/icons'
import { alpha } from '@material-ui/core'
import { Link, useHistory } from "react-router-dom";
import { getUser,logOut } from '../redux/helpers/authHelpers';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between"
    }
    ,logoLg: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    logoSm: {
        display: "block",
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    search: {
        display: "flex",
        alignItems: "center",
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        borderRadius: theme.shape.borderRadius,
        width: "50%",
        [theme.breakpoints.down("xs")]: {
            display: (props) => (props.open ? "flex" : "none"),
            width: "70%",
        },
    },
    input: {
        color: "white",
        marginLeft: theme.spacing(1),
    },
    cancel: {
        display: (props) => (props.open ? "flex" : "none"),
    },
    icons: {
        alignItems: "center",
        display: (props) => (props.open ? "none" : "flex"),
    },
    badge: {
        marginRight: theme.spacing(2),
    },
    searchButton: {
        marginRight: theme.spacing(2),
        display: "flex",
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    button: {
        alignItems: "center",
        marginRight: theme.spacing(2),
        '&:hover': {
            color:"black",
            backgroundColor: alpha(theme.palette.common.white, 0.05),
        },
        color: theme.palette.common.white,
        borderColor:theme.palette.common.white,
    },
    a:{
        textDecoration:"none",
        color: theme.palette.common.white,
        '&:hover': {
            textDecoration:"none",
            color: theme.palette.common.white,
            opacity:"0.9"
        },
    },
    

}))

function Navbar() {
    const [open, setOpen] = useState(false)
    const classes = useStyles({ open });
    const history = useHistory();

    const cart = useSelector((state) =>state.cartReducer.cart.length)
    const authUser = useSelector((state) => state.authReducer);

    const [user,setUser] = useState(null);
    useEffect(()=>{getUser()},[user])
    const clearCookie = () => {
        logOut()
        history.push('/')
    }

    if (authUser.jwtToken !== "") {
        return (
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar} >
                    <Typography variant="h6" className={classes.logoLg}>
                       <a href="/" className={classes.a}> Mini Mall</a>
                    </Typography>
                    <Typography variant="h6" className={classes.logoSm}>
                    <a href="/" className={classes.a}>Mall</a>
                    </Typography>
                    
                    <div className={classes.search} >
                        <Search />
                        <InputBase placeholder="Search..." className={classes.input} />
                        <Cancel className={classes.cancel} onClick={() => setOpen(false)} />
                    </div>
    
                    <div className={classes.icons} >
                        <Search className={classes.searchButton} onClick={() => setOpen(true)}/>
                        {/* <Badge badgeContent={4} color="secondary" className={classes.badge}>
                            <Mail />
                        </Badge> */}
                        <Badge color="secondary" className={classes.badge}>
                            <a href="/stores" className={classes.a} >
                            <Storefront/>
                            </a>
                        </Badge>
                        
                        {/* <Badge badgeContent={getCartLength()} color="secondary" className={classes.badge}> */}
                        <Badge badgeContent={cart} color="secondary" className={classes.badge}>
                        <a href="/cart" className={classes.a} >
                            <ShoppingCartOutlined />
                        </a> 
                        </Badge>
                        <Badge color="secondary" className={classes.badge}>
                            <ExitToApp onClick={clearCookie}  className={classes.a}/>
                        </Badge>
                        <Badge color="secondary" className={classes.badge}>
                            <Link to="/profile">
                            <PersonOutline className={classes.a}/>
                            </Link>
                            <h6 style={{alignItems:"center"}}>{getUser().name}</h6>
                        </Badge>
                    </div>
                  
                </Toolbar>
            </AppBar>
        )
    }
    else{
        return (
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar} >
                    <Typography variant="h6" className={classes.logoLg}>
                    <a href="/" className={classes.a}> Mini Mall</a>
                    </Typography>
                    <Typography variant="h6" className={classes.logoSm}>
                    <a href="/" className={classes.a}>Mall</a>
                    </Typography>
                    
                    <div className={classes.search} >
                        <Search />
                        <InputBase placeholder="Search..." className={classes.input} />
                        <Cancel className={classes.cancel} onClick={() => setOpen(false)} />
                    </div>
    
                    <div className={classes.icons} >
                    <Search className={classes.searchButton} onClick={() => setOpen(true)}/>
                    <Button href="/signup" variant="outlined"  className={classes.button}>SIGN UP</Button>
                    <Button href="/signin"  variant="outlined"  className={classes.button}>SIGN IN</Button>
                    
                    </div>
                  
                </Toolbar>
            </AppBar>
        )

    }

    
}

export default Navbar