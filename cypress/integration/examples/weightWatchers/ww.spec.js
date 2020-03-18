/// <reference types="cypress"/>
import WeightWatchersHomePage from '../../../support/pageObjects/weightWatchersHomePage'
import FindAMeetingPage from '../../../support/pageObjects/findAMeetingPage'

describe('Find studio', function() {

it('Should be able to find studio in my area ',() => {
    const weightWatchersHomePage =new WeightWatchersHomePage()
    const findAMeetingPage =new FindAMeetingPage()
    cy.visit('/')
    weightWatchersHomePage.getTitle().should('include', 'WW (Weight Watchers): Weight Loss & Wellness Help') //verify loadpage Title
    cy.contains('Find a Studio').click()
    weightWatchersHomePage.getTitle().should('include', 'Find WW Studios & Meetings Near You | WW USA')
    weightWatchersHomePage.getUrl().should('include', '/find-a-meeting/')
    findAMeetingPage.getMeetingSearch().type('10011')
    findAMeetingPage.getBlueArrow().click()
    findAMeetingPage.getLocationName().eq(0).should('contain', 'WW Studio Flatiron')// first location name
    findAMeetingPage.getLocationName().each(($officeTitle, index, $list) => {
    if($officeTitle.text().includes('WW Studio Flatiron'))
    {
        findAMeetingPage.getLocationDistance().eq(index).invoke('text').then((text) => {
            cy.log(text) //print location distance
        })
        findAMeetingPage.getLocationName().eq(index).click() //click on first location 
    }
    })
    findAMeetingPage.getUrl().should('includes', '/find-a-meeting/1180510/ww-studio-flatiron-new-york-ny') // verify url
    findAMeetingPage.getLocationName().should('contain', 'WW Studio Flatiron')//location title match with the first location name
    cy.get('.hours-list-item-wrapper.hours-list--currentday').invoke('text').then((text) => {
        cy.log(text)//print scheduled time for number of meeting each person have
    })
    cy.get('.schedule-detailed > :nth-child(1)').invoke('text').then((text) => {
        cy.log(text)//Print Sunday schedule
    })
    cy.get('.meeting-schedule__schedule').invoke('text').then((text) => {
        cy.log(text)//print Full schedule for the week
    })
    })
})