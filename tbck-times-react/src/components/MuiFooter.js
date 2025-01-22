import {AppBar, BottomNavigation} from "@mui/material"

export const MuiFooter = () => {
    return (
        <AppBar position="fixed" sx={{top: "auto", bottom: 0}}>
            <BottomNavigation sx={{width: "100%", backgroundColor: 'rgba(243, 166, 0)'}}>
                <p style={{color: "white", position: "absolute", left: "90%"}}>
                    TBCK | 2024
                </p>
            </BottomNavigation>
        </AppBar>
        
    )
}