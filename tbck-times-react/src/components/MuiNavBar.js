import { AppBar, Toolbar, TextField, Button, IconButton, Tooltip, Stack } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from "react-router-dom";

export const MuiNavBar = () => {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: "green" }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                {/* Logo Section */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Button component={Link} to={'/'}>
                        <img src="/images/TBCK_Logo.png" alt="TBCK Logo" style={{ height: "75px", width: "75px", paddingRight: 60 }} />
                    </Button>
                    {/* Search Section */}
                    <TextField
                        variant="standard"
                        size="small"
                        placeholder="Search..."
                        sx={{
                            width: '300px',
                            padding: 0,
                            input: {
                                paddingLeft: '10px',
                            },
                            '& .MuiInput-underline:before': {
                                borderBottom: 'none',
                            },
                            '& .MuiInputBase-root': {
                                background: 'none',
                                borderRadius: 0,
                                boxShadow: 'none',
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <SearchIcon sx={{ color: 'rgba(0, 0, 0, 0.7)', marginRight: '8px' }} />
                            ),
                        }}
                    />
                </div>

                {/* Right Section: Profile and Admin Options */}
                <Stack direction="row" spacing={2}>
                    <Button color="inherit" component={Link} to={'/'}>Home</Button>
                    <Button color="inherit" component={Link} to={'/Login'}>Login/Logout</Button>
                    
                    <IconButton sx={{ color: 'rgba(220, 44, 118)' }}>
                        <Tooltip
                            title={
                                <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Button variant="text" color="inherit" size="small" startIcon={<AccountCircleIcon />} component={Link} to={'/User'}>Profile</Button>
                                    <Button variant="text" color="inherit" size="small" startIcon={<AdminPanelSettingsIcon />}>Admin Page</Button>
                                    <Button variant="text" color="inherit" size="small" startIcon={<LoginIcon />} component={Link} to={'/Login'}>Login/Logout</Button>
                                </div>
                            }
                            placement="bottom"
                            arrow
                        >
                            <AccountCircleIcon />
                        </Tooltip>
                    </IconButton>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
