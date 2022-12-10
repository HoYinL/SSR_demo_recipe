import React, { useEffect } from "react";
import ReactDOM from 'react-dom';
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Twitter, Facebook, Instagram, YouTube, MailOutline } from "@mui/icons-material"
import { Footer } from "../../style"

const NavigationComponent = () => {
    const footer = Footer();
    return (
        <>
            <BottomNavigation
                showLabels
                className={footer.bottomNav}
                id="navigation"
            >
                <BottomNavigationAction icon={<Twitter />} />
                <BottomNavigationAction icon={<Facebook />} />
                <BottomNavigationAction icon={<Instagram />} />
                <BottomNavigationAction icon={<YouTube />} />
                <BottomNavigationAction icon={<MailOutline />} />
            </BottomNavigation>
        </>
    )
}

export default NavigationComponent