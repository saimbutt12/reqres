# Cypress API Testing Setup - README

## Steps I Took to Set Up Cypress API Testing

1. **Installed Dependencies**:  
   I installed Cypress and the necessary preprocessor for Cucumber syntax using npm.

2. **Configured Cucumber Preprocessor**:  
   I updated the Cypress plugins to enable the Cucumber preprocessor, allowing me to write tests using Gherkin syntax in `.feature` files.

3. **Created Feature Files**:  
   I wrote test scenarios in Gherkin syntax in `.feature` files. These scenarios outline the behavior I want to test, such as API responses and status codes.

4. **Created Step Definitions**:  
   For each step in my `.feature` files, I created corresponding step definition functions to handle making API requests and verifying the responses.

5. **Configured Cypress**:  
   I updated the `cypress.json` file to configure Cypress to recognize and use `.feature` files for my tests.

6. **Ran the Tests**:  
   After setting everything up, I ran my tests either interactively using the Cypress Test Runner or headlessly through the command line.

---

## Useful Links

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)
