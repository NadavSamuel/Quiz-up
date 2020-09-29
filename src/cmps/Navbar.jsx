import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import { BlackPage } from './BlackPage';

export class _Navbar extends React.Component {

    state = {
        isMenuShown: false
    }

    getClass = () => {
        return (this.state.isMenuShown) ? '' : 'hide'
    }

    closeMenu = () => {
        this.setState({ isMenuShown: false })
    }


    render() {


        return (
            <div className="navbar flex align-center justify-between  fill">
                <div className="flex">
                    <Link to="/"><img className='logo' src="https://res.cloudinary.com/dif8yy3on/image/upload/v1600282324/pvdvrgbpuoihrkdf9oti.png" alt="" /></Link>
                    <ul className="flex full-view">
                        <Link to="/browse"><li>Category</li></Link>
                        {/* <Link to="/dashboard"><li>Dashboard</li></Link> */}
                        <Link  to="/list/all"><li>Browse</li></Link>
                        <Link to="/edit"><li>Create Quiz</li></Link>
                    </ul>
                </div>

                <ul className={`popup-menu ${this.getClass()}`}>
                    <Link onClick={() => this.closeMenu()} to="/user">{this.props.loggedInUser ? <Avatar src={this.props.loggedInUser.profileImg} /> : <Avatar src='src="/broken-image.jpg' />}</Link>
                    <Link onClick={() => this.closeMenu()} to="/browse"><li>Category</li></Link>
                    {/* <Link to="/dashboard"><li>Dashboard</li></Link> */}
                    <Link onClick={() => this.closeMenu()} to="/list/all"><li>Browse</li></Link>
                    <Link onClick={() => this.closeMenu()} to="/edit"><li>Create Quiz</li></Link>
                </ul>

                <div>

                    <MenuIcon onClick={() => { this.setState({ isMenuShown: true }) }} className='phone-view' />
                    <Link className='full-view' to="/user">{this.props.loggedInUser ? <Avatar src={this.props.loggedInUser.profileImg} /> : <Avatar src='src="/broken-image.jpg' />}</Link>
                    <BlackPage closeMenu={this.closeMenu} isShown={this.state.isMenuShown} />
                </div>
            </div>

        )
    }
}


const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedinUser
    }
}

export const Navbar = connect(mapStateToProps)(_Navbar)
