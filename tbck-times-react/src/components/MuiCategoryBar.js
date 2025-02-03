import {AppBar, Stack, Toolbar, Typography, Button} from "@mui/material"
import { Link } from "react-router-dom"

export const MuiCategoryBar = () => {
    return (
        
        <AppBar position="static"  sx={{backgroundColor: 'rgba(0, 89, 90)', height: "40px"}} >  
            <Stack direction="row" spacing={2} sx={{height: "100%", alignItems: "center", justifyContent: "center"}}>
                <Button color="inherit" component={Link} to={''} >News</Button>
                <Button color="inherit" component={Link} to={''}>Advocacy</Button>
                <Button color="inherit" component={Link} to={'/WarriorOfTheMonth'}>Warrior Of The Month</Button>
                <Button color="inherit" component={Link} to={''}>Events</Button>
                <Button color="inherit" component={Link} to={'/GenericNews'}>Test News</Button>
                <Button color="inherit" component={Link} to={'/Newsletter'}>Newsletter</Button>
                <Button color="inherit" target="_blank" component={Link} to={'https://linktr.ee/tbckfoundation'}>Connect</Button>
                <Button color="inherit" target="_blank" component={Link} to={'https://www.bonfire.com/store/the-tbck-foundation-store/'}>Shop Support Gear</Button>
            </Stack>
        </AppBar>
    )
}