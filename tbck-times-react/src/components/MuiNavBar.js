import {AppBar, Toolbar, TextField, Button, IconButton, Icon, Tooltip} from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from "react-router-dom"

export const MuiNavBar = () => {
    return (
        
        <AppBar position="static"  sx={{backgroundColor: "white"}}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                <container style={{display: "flex", alignItems: "center"}}>
                    <Button component={Link} to={'/'}>
                        <img src="/images/TBCK_Logo.png"  alt="TBCK Logo" style={{height: "75px", width: "75px", paddingRight: 60}}/>
                    </Button>
                    <TextField
                        variant="standard"
                        size="small"
                        placeholder="Search..."
                        sx={{
                            width: '300px',
                            padding: 0, 
                            input: {
                                paddingLeft: '10px',  // Space between icon and text
                            },
                            '& .MuiInput-underline:before': {
                                borderBottom: 'none',  // Removes underline
                            },
                            '& .MuiInputBase-root': {
                                background: 'none',  // Ensures no background color
                                borderRadius: 0,  // Ensure no border-radius
                                boxShadow: 'none',  // Removes any shadow
                            }
                        }}
                        slotProps={{

                            input: {
                                startAdornment: (
                                    <SearchIcon sx={{ color: 'rgba(0, 0, 0, 0.7)', marginRight: '8px' }} />
                                ),
                                
                            },
                            
                        }}
                    />
                </container>
                
                <IconButton sx={{ color: 'rgba(220, 44, 118)' }}>
                    
                    <Tooltip
                        title={
                            <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                                <Button variant="text" color="White" size="small" startIcon={<AccountCircleIcon/>}component={Link} to={'/User'}>Profile</Button>
                                <Button variant="text" color="White" size="small" startIcon={<AdminPanelSettingsIcon/>}>Admin Page</Button>
                                <Button variant="text" color="White" size="small" startIcon={<LoginIcon/>} component={Link} to={'/Login'}>Login/Logout</Button>
                            </div>
                        }
                        placement="bottom"
                        arrow
                    >
                        <AccountCircleIcon/>
                    </Tooltip>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}