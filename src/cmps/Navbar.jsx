import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
export function _Navbar({loggedInUser}) {
    return (
        <div className="navbar flex align-center justify-between  fill">
            <Link to="/"><img src="https://res.cloudinary.com/dif8yy3on/image/upload/v1600282324/pvdvrgbpuoihrkdf9oti.png" alt="" /></Link>

            <ul className="flex">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/user">{loggedInUser ? 'Profile' : 'Sign In'}</Link></li>
                <li><Link to="/browse">Browse</Link></li>
            </ul>
        </div>

    )
}


const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedinUser
    }
}

export const Navbar = connect(mapStateToProps)(_Navbar)
