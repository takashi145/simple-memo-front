import React from 'react'
import { Link } from 'react-router-dom';
import Logo from './../assets/logo.png';

const AppLogo = () => {
  return (
    <Link to="/" className="flex items-center">
        <span className="self-center text-xl font-semibold whitespace-nowrap">
          <img src={Logo} className="w-12 h-12" />
        </span>
    </Link>
  )
}

export default AppLogo
