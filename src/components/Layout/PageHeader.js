import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Nav from './Nav';
import headerLogo from '../../../assets/gbhpc-web-header.png';

const Header = styled.header`
  position: sticky;
`;
const SiteTitle = styled.h1`
  text-align: center;
  img {
    display: block;
    margin: auto;
    max-width: 100%;
  }
`;

const PageHeader = props => {
  const { pageTitle } = props;
  return (
    <Header>
      <SiteTitle>
        <img src={headerLogo} alt="GBH Players Club" />
      </SiteTitle>
      {pageTitle && <Typography variant="h2">{pageTitle}</Typography>}
      <Nav />
    </Header>
  );
};

PageHeader.propTypes = {
  pageTitle: PropTypes.string,
};

PageHeader.defaultProps = {
  pageTitle: null,
};

export default PageHeader;
