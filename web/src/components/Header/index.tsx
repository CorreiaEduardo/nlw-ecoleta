import React from 'react'
import { Link } from 'react-router-dom'
import { IconType } from 'react-icons/lib/cjs'
import logo from '../../assets/logo.svg'

import './styles.css'

interface Props {
  ButtonIcon: IconType;
  buttonLabel: string;
  buttonDestination: string;
}

const Header: React.FC<Props> = ({ ButtonIcon, buttonLabel, buttonDestination }) => {
  return (
    <header>
      <img src={logo} alt="Ecoleta" />
      <Link to={buttonDestination}>
        <ButtonIcon />
        <span className='button-label'>{ buttonLabel }</span>
      </Link>
    </header>
  )
}

export default Header;