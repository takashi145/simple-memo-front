import React from 'react'
import Logo from './../assets/logo.png';

const AppLogo = () => {
  return (
    <div className="flex items-center">
        <span className="self-center text-xl font-semibold whitespace-nowrap">
          <img src={Logo} className="w-36" />
        </span>
    </div>
  )
}

export default AppLogo
