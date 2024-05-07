import React, { useState } from "react";
import "../../assets/css/Nav.css";

export const Nav = (props: {}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [initialY, setInitialY] = useState<number>(0);
    const [navTop, setNavTop] = useState<number>(20); // Position initiale du haut de la navbar
    const navHeight = 150; // Hauteur de votre navbar en pixels

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
