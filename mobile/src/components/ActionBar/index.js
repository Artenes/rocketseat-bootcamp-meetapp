import React from 'react';

import { Container, Logo } from './styles';

import logo from '~/assets/logo.png';

export default function ActionBar() {
  return (
    <Container>
      <Logo source={logo} />
    </Container>
  );
}
