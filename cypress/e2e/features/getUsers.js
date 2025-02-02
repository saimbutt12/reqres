import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I have the API base URL {string}", function (url) {
  cy.wrap(url).as("baseURL");
});

When("I send a {word} request to {string}", function (method, endpoint) {
  cy.get("@baseURL").then((baseURL) => {
    cy.request({
      method: method.toUpperCase(),
      url: `${baseURL}${endpoint}`,
      failOnStatusCode: false, // Prevent Cypress from failing on non-2xx responses
    }).as("apiResponse");
  });
});

Then("the response status should be {int}", function (statusCode) {
  cy.get("@apiResponse").its("status").should("eq", statusCode);
});

Then("the response should contain a list of users", function () {
  cy.get("@apiResponse").its("body.data").should("be.an", "array").and("not.be.empty");
});

Then("each user should have {string}, {string}, {string}, {string}, {string}", function (id, email, firstName, lastName, avatar) {
  cy.get("@apiResponse").its("body.data").each((user) => {
    expect(user).to.have.property(id);
    expect(user).to.have.property(email);
    expect(user).to.have.property(firstName);
    expect(user).to.have.property(lastName);
    expect(user).to.have.property(avatar);
  });
});

Then("the response data should contain an empty list", function () {
  cy.get("@apiResponse").its("body.data").should("be.an", "array").and("be.empty");
});

Then("the response should be received within {int}ms", function (time) {
  cy.get("@apiResponse").its("duration").should("be.lessThan", time);
});

Then("the response should contain up to {int} users", (maxUsers) => {
    cy.get("@apiResponse").its("body.data").should("be.an", "array").and("have.length.lte", maxUsers);
  });
  

Then("the response header {string} should be {string}", function (header, value) {
  cy.get("@apiResponse").its(`headers.${header.toLowerCase()}`).should("include", value);
});

Then("the response should contain {string}, {string}, and {string}", function (total, totalPages, perPage) {
  cy.get("@apiResponse").its("body").should((body) => {
    expect(body).to.have.property(total);
    expect(body).to.have.property(totalPages);
    expect(body).to.have.property(perPage);
  });
});

Given("I use an invalid API key", function () {
  cy.wrap("invalid-key").as("apiKey");
});

Then("the first user should have {string}, {string}, {string}, {string}, and {string}", function (id, email, firstName, lastName, avatar) {
  cy.get("@apiResponse").its("body.data[0]").should((user) => {
    expect(user).to.have.property(id);
    expect(user).to.have.property(email);
    expect(user).to.have.property(firstName);
    expect(user).to.have.property(lastName);
    expect(user).to.have.property(avatar);
  });
});

Then("the {string} should contain {string}", function (field, value) {
  cy.get("@apiResponse").its(`body.data[0].${field}`).should("include", value);
});

Given("the API is temporarily unavailable", function () {
  cy.intercept("GET", "**/users?page=2", { statusCode: 503 }).as("mockedApiResponse");
});
