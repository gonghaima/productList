import React from 'react';
import Router from 'react-router-dom/MemoryRouter';
import { renderToString } from 'react-dom/server';
import RouteProduct from 'components/RouteProduct';

describe('RouteProduct', () => {
  it('should redirect for all access', () => {
    const render = renderToString(
      <Router initialEntries={['/private']}>
        <RouteProduct exact path="/private" component={() => <div>PRIVATE</div>} />
      </Router>,
    );

    expect(render).toMatchSnapshot();
  });
});
