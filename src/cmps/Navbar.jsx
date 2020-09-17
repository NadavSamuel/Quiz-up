import React from 'react'
import { Link } from 'react-router-dom'

export function Navbar() {
    return (
        <div className="navbar flex align-center justify-between  fill">
            <Link to="/"><img src="https://res.cloudinary.com/dif8yy3on/image/upload/v1600282324/pvdvrgbpuoihrkdf9oti.png" alt=""/></Link>
            
            <ul className="flex">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">profile</Link></li>
                <li><Link to="/">browse</Link></li>
            </ul>
        </div>
        
    )
}