import React, { useContext, useState } from "react";
import "../../assets/css/Nav.css";
import { Link } from "react-router-dom";
import { AppContext, useUserContext } from "../hooks/AppContext";

export const Nav = (props: {}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [initialY, setInitialY] = useState<number>(0);
    const [navTop, setNavTop] = useState<number>(20); // Position initiale du haut de la navbar
    const navHeight = 300; // Hauteur de votre navbar en pixels
    const { logOut } = useUserContext();
    const user = useContext(AppContext);
    // user?.user si est connecté
    // user?.user?.admin == true si est admin
    // undefined si est pas connecté

    const toggleNavBar = () => {
        setIsOpen(!isOpen);
    }

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setInitialY(event.clientY);
        document.body.style.userSelect = "none";

    }

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            const movementY = event.clientY - initialY;
            let newNavTop = navTop + movementY;

            // Limite supérieure
            newNavTop = Math.max(newNavTop, 0);
            
            // Limite inférieure
            const windHeight = window.innerHeight;
            newNavTop = Math.min(newNavTop, windHeight - navHeight);

            setNavTop(newNavTop);
            setInitialY(event.clientY);
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false);
        document.body.style.userSelect = "auto";

    }

    const handleMouseLeave = () => {
        setIsDragging(false);
        document.body.style.userSelect = "auto";

    }

    const handleNavLinkClick = () => {
        setIsOpen(false);
    }

    return (
    <nav className={isOpen ? "open": ""} style={{ top: `${navTop}px` }} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseLeave}>
        <div className="nav-content">
            <div className="toggle-btn" onClick={toggleNavBar}>
                <i className='btn-plus'></i>
            </div>
                <span style={{ '--i': 1 } as React.CSSProperties} >
                        <Link to="/" className={"nav-link"} onClick={handleNavLinkClick}><i className='btn-home'></i></Link>
                </span>
            {user?.user && !user?.user?.admin && (
                <>
                    <span style={{ '--i': 2 } as React.CSSProperties}>
                        <Link to="/account" className={"nav-link"} onClick={handleNavLinkClick}><i className='btn-account'  ></i></Link>
                    </span>
                    <span style={{ '--i': 3 } as React.CSSProperties}>
                        <Link to="/friends" className={"nav-link"} onClick={handleNavLinkClick}><i className='btn-friends' ></i></Link>
                    </span>
                    <span style={{ '--i': 4 } as React.CSSProperties}>
                    <Link to="/game" className={"nav-link"} onClick={handleNavLinkClick}><i className='btn-set-up-game' ></i></Link>
                    </span>
                    <span style={{ '--i': 5 } as React.CSSProperties}>
                        <a className={"nav-link"} onClick={logOut}><i className='btn-log-out'  onClick={handleNavLinkClick}></i></a>
                    </span>
                </>
            )}
            {user?.user?.admin && (
                <>
                    <span style={{ '--i': 3 } as React.CSSProperties}>
                        <Link to="/admin" className={"nav-link"} onClick={handleNavLinkClick}><i className='btn-admin'  ></i></Link>
                    </span>
                    <span style={{ '--i': 4 } as React.CSSProperties}>
                    <Link to="/change-parameters" className={"nav-link"} onClick={handleNavLinkClick}><i className='btn-change-paramters' ></i></Link>
                    </span>
                    <span style={{ '--i': 2 } as React.CSSProperties}>
                        <Link to="/logs" className={"nav-link"} onClick={handleNavLinkClick}><i className='btn-logs'></i></Link>
                    </span>
                    <span style={{ '--i': 5 } as React.CSSProperties}>
                        <a className={"nav-link"} onClick={logOut}><i className='btn-log-out'  onClick={handleNavLinkClick}></i></a>
                    </span>
                </>
            )}

            {!user?.user && (
                <>
                    <span style={{ '--i': 2 } as React.CSSProperties}>
                        <Link to="/sign-in" className={"nav-link"} onClick={handleNavLinkClick}><i className='btn-sign-in'></i></Link>
                    </span>
                    <span style={{ '--i': 3 } as React.CSSProperties}>
                        <Link to="/sign-up" className={"nav-link"} onClick={handleNavLinkClick}><i className='btn-sign-up' ></i></Link>
                    </span>
                </>
            )}
        </div>
    </nav>
    );
};
