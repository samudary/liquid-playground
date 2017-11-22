import React from 'react';
import './PageHeader.css';

const PageHeader = () => {
  return (
    <div className="container PageHeader">
      <nav className="navbar" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://www.github.com">
            <h3 className="has-text-weight-bold is-size-3 has-text-dark">Liquid Playground</h3>
          </a>

          <button className="button navbar-burger">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <a
          className="navbar-item navbar-end button is-info"
          href="https://github.com/samudary/liquid-playground"
          target="_blank"
          rel="noopener noreferrer">
            Project on Github
        </a>
      </nav>
    </div>
  );
}

export default PageHeader;
