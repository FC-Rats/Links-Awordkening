import React, { useState } from "react";
import "../../assets/css/Nav.css";

export const Nav = (props: {}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavBar = () => {
        setIsOpen(!isOpen);
    }

    const handleNavLinkClick = () => {
        setIsOpen(false);
    }
    
    return (
    <nav className={isOpen ? "open": ""}>
        <div className="nav-content">
            <div className="toggle-btn" onClick={toggleNavBar}>
                <i className='btn-plus'></i>
            </div>
            <span style={{ '--i': 1 } as React.CSSProperties} >
                <a href="#part-presentation"><i className='btn-presentation'  onClick={handleNavLinkClick}></i>Home</a>
            </span>
            <span style={{ '--i': 2 } as React.CSSProperties}>
                <a href="#part-projects"><i className='btn-competences'  onClick={handleNavLinkClick}></i></a>
            </span>
            <span style={{ '--i': 3 } as React.CSSProperties}>
                <a href="#part-timeline"><i className='btn-parcours'  onClick={handleNavLinkClick}></i></a>
            </span>
            <span style={{ '--i': 4 } as React.CSSProperties}>
                <a href="#part-alternance"><i className='btn-alternance'  onClick={handleNavLinkClick}></i></a>
            </span>
            <span style={{ '--i': 5 } as React.CSSProperties}>
                <a href="#part-credits"><i className='btn-liens'  onClick={handleNavLinkClick}></i></a>
            </span>
        </div>
    </nav>
    );
};
