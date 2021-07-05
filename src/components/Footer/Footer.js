import React from "react";
import "./Footer.scss";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="container Footer-container">
        <div className="Footer__author-block">
          <h2 className="Footer__title">Made by</h2>
          <a className="Footer__author" href="https://github.com/Dr-Frame">
            <p>Dr-Frame</p>
          </a>
        </div>

        <div className="Footer__contacts">
          <p className="Footer__contacts-title">Contacts:</p>
          <ul className="Footer__contacts-list">
            <li className="Footer__contacts-item">
              <AiFillGithub className="Footer__contacts-icon" />
              <a
                className="Footer__contacts-link"
                href="https://github.com/Dr-Frame"
              >
                Github
              </a>
            </li>
            <li className="Footer__contacts-item">
              <FaLinkedin className="Footer__contacts-icon" />
              <a
                className="Footer__contacts-link"
                href="https://www.linkedin.com/in/vladislav-remenyuk-2446491b6/"
              >
                LinkedIn
              </a>
            </li>
            <li className="Footer__contacts-item">
              <FaTelegram className="Footer__contacts-icon" />
              <a className="Footer__contacts-link" href="https://t.me/Dr_Frame">
                Telegram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
