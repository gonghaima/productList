import React from 'react';
import Product from 'containers/Product';

import { Container, Screen } from 'styled-minimal';

const Private = () => (
  <Screen key="Private" data-testid="PrivateWrapper">
    <Container verticalPadding>
      <Product />
    </Container>
  </Screen>
);

export default Private;
