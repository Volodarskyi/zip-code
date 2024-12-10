import { FC } from 'react';

import Auth from '@/components/Auth/Auth';

import './header.styles.css';

const Header: FC = () => {
  return (
    <header className="header">
      <div>ZIP Code CANADA</div>
      <Auth />
    </header>
  );
};

export default Header;
