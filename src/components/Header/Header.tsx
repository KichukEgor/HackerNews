import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { HomeContext } from '../../context/HomeContext';
import RefreshButton from '../RefreshButton/RefreshButton';
import './Header.css';

const Header: React.FC = () => {
  const { isLoading, fetchStories } = useContext(HomeContext);
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <DataObjectIcon fontSize="large" />
          <h1><a href="/">Hacker News</a></h1>
        </div>
        <div className="header-right">
          {isMainPage && <RefreshButton isLoading={isLoading} onClick={fetchStories} label="Refresh News" />}
        </div>
      </div>
    </header>
  );
};

export default Header;
