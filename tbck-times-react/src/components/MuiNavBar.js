import {AppBar, Stack, Toolbar, Typography, Button} from "@mui/material"
import { Link } from "react-router-dom"

export const MuiNavBar = () => {
    return (
        
        <AppBar position="static"  sx={{backgroundColor: "green"}}>
            <Toolbar>
                <Typography variant="h6" edge='start' component={"div"} sx={{flexGrow: 1}}>
                    TBCK Times
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button color="inherit" component={Link} to={'/GenericNews'}>Test Story</Button>
                    <Button color="inherit" component={Link} to={'/'}>home</Button>
                    <Button color="inherit" component={Link} to={'/Login'}>Login/Logout</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}