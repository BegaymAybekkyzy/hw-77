import {AppBar, Link, Toolbar, Typography} from '@mui/material';
import logo from "../../assets/logo.png"

const AppToolbar = () => {
    return (
        <AppBar position="sticky" sx={{mb: 5, background: "#6A5ACD"}}>
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{flexGrow: 1, display: "flex", alignItems: "center"}}
                >
                    <Link href="#" underline="none">
                        <img style={{width: "56px", marginRight: "10px"}} src={logo} alt="logo"/>
                    </Link>
                    <span>Guestbook</span>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;