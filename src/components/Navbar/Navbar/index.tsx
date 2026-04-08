import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import LogoAvatar from '../assets/avatar1.png';
import Messeger from '../assets/messege.png';
import api from '../../../services/api';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { TbDeviceGamepad2 } from 'react-icons/tb';
import { GoHome } from 'react-icons/go';
import { BiFootball } from 'react-icons/bi';
import { MdOutlineExitToApp } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { setSourceMapRange } from 'typescript';

export default function Navbar() {
  const [active, setMode] = useState(false);
  const [pageTop, setPageTop] = useState(false);
  const [soluction, setSoluction] = useState(false);
  const [transparence, setTransparence] = useState(false);
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState('');
  const navBar = document.querySelector('#navBarTop');

  const history = useNavigate();

  useEffect(() => {}, []);

  window.addEventListener('scroll', rooling);

  function Deslogar() {
    localStorage.clear();
    history('/');
  }

  function rooling() {
    if (window.pageYOffset > 0) {
      setPageTop(true);
    } else {
      setPageTop(false);
    }
  }

  function LimpaMessegeError() {
    setAlertErro(false);
  }

  const ToggleMode = () => {
    setMode(!active);
  };
  function arrowSolucTrue() {
    setSoluction(true);
  }

  function arrowSolucFalse() {
    setSoluction(false);
  }
  function arrowTranspTrue() {
    setTransparence(true);
  }
  function arrowTranspFalse() {
    setTransparence(false);
  }

  return (
    <div className="total-nav">
      <div
        id="navBarTop"
        className={pageTop || active ? 'Nav Nav-scroll ' : 'Nav Nav-fixed'}
      >
        <div className="logo-lik">
          <div className="logo-a"></div>
          <div className="logo-navbar"></div>
        </div>
      </div>

      {/* =============== Menu Mobile =========================================================================== */}

      <div className={active ? 'menu-mobile' : 'not-menu'}>
        <ul className="menu-ul-mobile">
          <div className="menu-mobile-li">
            <li onClick={ToggleMode}>
              <a href="/">
                <GoHome style={{ marginRight: 10 }} />
                Início
              </a>
            </li>
            <br></br>
          </div>
        </ul>
      </div>
    </div>
  );
}
