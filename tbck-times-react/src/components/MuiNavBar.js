import React, { useState, useEffect } from "react"
import { AppBar, Toolbar, TextField, Button, IconButton, Tooltip } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from "react-router-dom"

export const MuiNavBar = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user")
        if (storedUser) {
            const user = JSON.parse(storedUser)
            if (user.role === "ADMIN") {
                setIsAdmin(true)
            }
        }
    }, [])

    const handleSearch = (event) => {
        if (event.key === 'Enter' && searchQuery.trim() !== '') {
            navigate(`/Search/${searchQuery}`)
        }
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: "white" }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                <container style={{ display: "flex", alignItems: "center" }}>
                    <Button component={Link} to={'/'}>
                        <img src="/images/TBCK_Logo.png" alt="TBCK Logo" style={{ height: "75px", width: "75px", paddingRight: 60 }} />
                    </Button>
                    <TextField
                        variant="standard"
                        size="small"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        onKeyDown={handleSearch}
                        sx={{
                            width: '300px',
                            padding: 0,
                            input: { paddingLeft: '10px' },
                            '& .MuiInput-underline:before': { borderBottom: 'none' },
                            '& .MuiInputBase-root': { background: 'none', borderRadius: 0, boxShadow: 'none' }
                        }}
                        slotProps={{
                            input: { startAdornment: (<SearchIcon sx={{ color: 'rgba(0, 0, 0, 0.7)', marginRight: '8px' }} />) },
                        }}
                    />
                </container>

                <IconButton sx={{ color: 'rgba(220, 44, 118)' }}>
                    <Tooltip
                        title={
                            <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Button variant="text" color="White" size="small" startIcon={<AccountCircleIcon />} component={Link} to={'/User'}>Profile</Button>
                                {isAdmin && (
                                    <Button variant="text" color="White" size="small" startIcon={<AdminPanelSettingsIcon />} component={Link} to={'/Admin'}>Admin Page</Button>
                                )}
                                <Button variant="text" color="White" size="small" startIcon={<LoginIcon />} component={Link} to={'/Login'}>Login/Signup</Button>
                            </div>
                        }
                        placement="bottom"
                        arrow
                    >
                        <AccountCircleIcon />
                    </Tooltip>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
