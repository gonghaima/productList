import React from 'react';
import Github from 'containers/Product';

import { Container, Screen } from 'styled-minimal';

const Private = () => (
  <Screen key="Private" data-testid="PrivateWrapper">
    <Container verticalPadding>
      <Github />
    </Container>
  </Screen>
);

export default Private;
