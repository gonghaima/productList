describe('React-Redux-Saga-Boilerplate', () => {
  it('should assert that <title> is correct', () => {
    cy.visit('http://localhost:3000');
    cy.title().should('include', 'react-redux-saga-boilerplate');
  });

  it('should be able to view the private area', () => {
    cy.getByTestId('PrivateWrapper')
      .should('have.length', 1)
      .getByTestId('ProductGrid')
      .should('have.length', 1)
      .should('have.attr', 'data-type', 'react');

    cy.getByTestId('ProductGrid')
      .get('li')
      .should('have.length', 15);
  });

  it('should be able to render the selector', () => {
    cy.getByTestId('ProductSelector')
      .select('20 per page')
      .should('have.value', '20');
  });

  it('should render the pagination', () => {
    cy.get('.pagination').should('be.visible');
  });
});
