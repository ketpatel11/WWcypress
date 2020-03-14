/// <reference types="cypress"/>
import WeightWatchersHomePage from '../../../support/pageObjects/weightWatchersHomePage'
import FindAMeetingPage from '../../../support/pageObjects/findAMeetingPage'

describe('Find studio', function() {

it('Should be able to find studio in my area ',() => {
    const weightWatchersHomePage =new WeightWatchersHomePage()
    const findAMeetingPage =new FindAMeetingPage()
    cy.visit('/')
    weightWatchersHomePage.getTitle().should('include', 'WW (Weight Watchers): Weight Loss & Wellness Help')
    cy.contains('Find a Studio').click()
    weightWatchersHomePage.getTitle().should('include', 'Find WW Studios & Meetings Near You | WW USA')
    weightWatchersHomePage.getUrl().should('include', '/find-a-meeting/')
    findAMeetingPage.getMeetingSearch().type('10011')
    findAMeetingPage.getBlueArrow().click()
    findAMeetingPage.getLocationName().eq(0).should('contain', 'WW Studio Flatiron')
    //cy.get('.location__name > span').eq(0).should(($div) => {
        // access the native DOM element
        //expect($div.get(0).innerText).to.eq('WW Studio Flatiron')
    findAMeetingPage.getLocationName().each(($officeTitle, index, $list) => {
    if($officeTitle.text().includes('WW Studio Flatiron'))
    {
        findAMeetingPage.getLocationDistance().eq(index).invoke('text').then((text) => {
            cy.log(text)
        })
        findAMeetingPage.getLocationName().eq(index).click()
    }
    })
    findAMeetingPage.getUrl().should('includes', '/find-a-meeting/1180510/ww-studio-flatiron-new-york-ny')
    findAMeetingPage.getLocationName().should('contain', 'WW Studio Flatiron')
    cy.get('.hours-list-item-wrapper.hours-list--currentday').invoke('text').then((text) => {
        cy.log(text)//print scheduled time for number of meeting each person have
    })
    })
})