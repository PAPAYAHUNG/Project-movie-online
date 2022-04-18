import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark" style={{ backgroundColor: 'linkImagee3f2fd' }}>
                <a className="navbar-brand" href="linkImage">
                    <img src="./Images/PngItem_33985.png" alt='134' style={{ height: 60 }} />
                </a>
                <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="linkImagecollapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0 justify-content-center navbar-modified">
                        <li className="nav-item active">
                            <a className="nav-link" href="linkImage">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="linkImage">Contact</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="linkImage">News</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="linkImage">Apps</a>
                        </li>
                    </ul>
                </div>
                <div className="d-flex">
                    <NavLink to='signUp'>
                        <button className="btn btn-success mr-3">Register</button>
                    </NavLink>
                    <NavLink to='signIn'>
                        <button className="btn btn-primary">Login</button>
                    </NavLink>
                </div>
            </nav>
        </div>
    )
}
