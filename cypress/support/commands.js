// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-iframe';

Cypress.Commands.add(
  'getInDocument',
  {prevSubject: 'document'},
  (document, selector) => Cypress.$(selector, document)
);

Cypress.Commands.add(
  'getWithinIframe',
  (targetElement) => cy.get('iframe').iframeLoaded().its('document').getInDocument(targetElement)
);

Cypress.Commands.add('iframe', { prevSubject: 'element' }, (iframe) => {
  return new Cypress.Promise(resolve => {
    iframe.on('load', () => {
      resolve(iframe.contents().find('body'))
    })
  })
});

Cypress.Commands.add('selectProduct', (productName) => {
  cy.get('h4.card-title').each(($el, index, $list) => {
    if($el.text().includes(productName))
    {
        cy.get('button.btn.btn-info').eq(index).click() 
    }
 })
}) 