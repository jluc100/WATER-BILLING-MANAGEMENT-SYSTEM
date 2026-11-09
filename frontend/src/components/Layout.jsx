import { useState } from 'react';

import { NavLink, Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

import WhatsAppButton from './WhatsAppButton';



const roleLabels = {

  admin: 'Administrator',

  customer: 'Customer',

  wasac_manager: 'Operations Manager',

};



export default function Layout({ children, navItems, variant = 'dark' }) {

  const { profile, logout } = useAuth();

  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);



  const handleLogout = () => {

    logout();

    navigate('/login');

  };



  return (

    <div className={`layout layout-${variant}`}>

      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>

        <div className="sidebar-header">

          <Link to="/" className="sidebar-brand">

            <span className="sidebar-brand-mark">SW</span>

            <span className="sidebar-brand-text">Smart Water Bill</span>

          </Link>

          <button

            type="button"

            className="sidebar-close-mobile"

            onClick={() => setMobileOpen(false)}

            aria-label="Close menu"

          >

            ✕

          </button>

        </div>



        <div className="sidebar-section">

          <div className="sidebar-title">Menu</div>

          <nav>

            {navItems.map((item) => (

              <NavLink

                key={item.to}

                to={item.to}

                end={item.end ?? (item.to === '/admin' || item.to === '/dashboard' || item.to === '/manager')}

                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}

                onClick={() => setMobileOpen(false)}

              >

                <span className="sidebar-link-dot" />

                {item.label}

              </NavLink>

            ))}

          </nav>

        </div>



        <div className="sidebar-footer">

          <div className="sidebar-user">

            <div className="sidebar-user-avatar">{profile?.full_name?.slice(0, 1)?.toUpperCase() || 'U'}</div>

            <div>

              <div className="sidebar-user-name">{profile?.full_name}</div>

              <div className="sidebar-user-role">{roleLabels[profile?.role] || profile?.role}</div>

            </div>

          </div>

          <button type="button" className="btn-secondary sidebar-logout" onClick={handleLogout}>

            Logout

          </button>

        </div>

      </aside>



      {mobileOpen && (

        <button

          type="button"

          className="sidebar-backdrop"

          aria-label="Close menu"

          onClick={() => setMobileOpen(false)}

        />

      )}



      <div className="layout-main-wrap">

        <header className="topbar">

          <button

            type="button"

            className="topbar-menu-btn"

            onClick={() => setMobileOpen(true)}

            aria-label="Open menu"

          >

            ☰

          </button>

          <div className="topbar-spacer" />

          <Link to="/" className="topbar-home-link">Public site</Link>

        </header>

        <main className="main">{children}</main>

      </div>

      <WhatsAppButton />

    </div>

  );

}

