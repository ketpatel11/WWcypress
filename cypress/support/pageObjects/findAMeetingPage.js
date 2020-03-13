class FindAMeetingPage
{
getMeetingSearch() 
{
    return cy.get('#meetingSearch')
}
getUrl() 
{
    return cy.url()
}
getBlueArrow() 
{
    return cy.get('.form-blue-pill > .input-item > .btn')
}
getLocationName() 
{
    return cy.get('.location__name > span')
}
getLocationDistance() 
{
    return cy.get('.location__distance')
}
}

export default FindAMeetingPage;