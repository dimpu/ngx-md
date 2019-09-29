import { getGreeting } from '../support/app.po';

describe('ngx-md-demo', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to ngx-md-demo!');
  });
});
