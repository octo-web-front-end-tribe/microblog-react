import React from 'react';
import NavigationLink from '../NavigationLink/NavigationLink';
import {
  navigationBar,
  navigationBarInnerContainer,
  navigationBarUl,
  navigationBarLi,
} from './NavigationBar.css';

const NavigationBar = () => (
  <div className={navigationBar}>
    <div className={navigationBarInnerContainer}>
      <div>
        <ul className={navigationBarUl}>
          <li className={navigationBarLi}>
            <NavigationLink icon="home" url="/" label="Accueil" isActive="active" />
          </li>
          <li className={navigationBarLi}>
            <NavigationLink icon="info-circle" url="/about" label="À propos" isActive="" />
          </li>
        </ul>
      </div>

      <div>
        <NavigationLink icon="power-off" url="/logout" label="Déconnecter" isActive="" />
      </div>
    </div>
  </div>
);

export default NavigationBar;
