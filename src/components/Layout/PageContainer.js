import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageHeader from './PageHeader';
import GlobalStyles from '../../styles/GlobalStyles';
import Reset from '../../styles/Reset';
import { design } from '../../utils';

const Container = styled.div`
  padding: ${design.spacing[4]};
  background-color: ${design.colors.primary};
  color: ${design.colors.white};
  a {
    color: ${design.colors.white};
    &:active,
    &:visited {
      color: ${design.colors.tertiary};
    }
    &:hover {
      color: ${design.colors.primary};
      background-color: ${design.colors.white};
    }
  }
`;

const PageContent = styled.main`
  padding: ${design.spacing[4]};
`;

const PageContainer = props => {
  const { children, pageTitle } = props;
  return (
    <Container>
      <Reset />
      <GlobalStyles />
      <PageHeader pageTitle={pageTitle} />
      <PageContent>{children}</PageContent>
    </Container>
  );
};

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  pageTitle: PropTypes.string,
};

PageContainer.defaultProps = {
  pageTitle: null,
};

export default PageContainer;
