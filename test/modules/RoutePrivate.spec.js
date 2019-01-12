import React from 'react';
import Router from 'react-router-dom/MemoryRouter';
import { renderToString } from 'react-dom/server';
import RoutePrivate from 'components/RoutePrivate';

describe('modules/RoutePrivate', () => {
  it('should redirect for all access', () => {
    const render = renderToString(
      <Router initialEntries={['/private']}>
        <RoutePrivate exact path="/private" component={() => <div>PRIVATE</div>} />
      </Router>,
    );

    expect(render).toMatchSnapshot();
  });
});
