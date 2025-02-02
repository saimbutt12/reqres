Feature: Get Users API Testing

 Background:
    Given I have the API base URL "https://reqres.in/api"

  Scenario: Fetch users from page 2 successfully
    When I send a GET request to "/users?page=2"
    Then the response status should be 200
    And the response should contain a list of users
    And each user should have "id", "email", "first_name", "last_name", "avatar"

  Scenario: Fetch users with an invalid page number
    When I send a GET request to "/users?page=9999"
    Then the response status should be 200
    And the response data should contain an empty list

  Scenario: Fetch users with a negative page number
    When I send a GET request to "/users?page=-1"
    Then the response status should be 200
    And each user should have "id", "email", "first_name", "last_name", "avatar"


  Scenario: Fetch users with a non-numeric page value
    When I send a GET request to "/users?page=abc"
    Then the response status should be 200

  Scenario: Fetch users without the "page" query parameter
    When I send a GET request to "/users"
    Then the response status should be 200
    And the response should contain a list of users

  Scenario: Fetch users with a large page size
    When I send a GET request to "/users?page=2&per_page=100"
    Then the response status should be 200
    And the response should contain up to 100 users

  Scenario: Validate response time is under 2 seconds
    When I send a GET request to "/users?page=2"
    Then the response should be received within 2000ms

  Scenario: Ensure response headers include JSON content type
    When I send a GET request to "/users?page=2"
    Then the response header "Content-Type" should be "application/json; charset=utf-8"

  Scenario: Ensure response includes total pages and total users
    When I send a GET request to "/users?page=2"
    Then the response should contain "total", "total_pages", and "per_page"

  Scenario: Fetch users using POST instead of GET
    When I send a POST request to "/users?page=2"
    Then the response status should be 201

  Scenario: Fetch users using DELETE instead of GET
    When I send a DELETE request to "/users?page=2"
    Then the response status should be 204


  Scenario: Validate first user in the response
    When I send a GET request to "/users?page=2"
    Then the first user should have "id", "email", "first_name", "last_name", and "avatar"
    And the "email" should contain "@reqres.in"

  Scenario: Fetch users with multiple query parameters
    When I send a GET request to "/users?page=2&per_page=5&sort=asc"
    Then the response status should be 200
    And the response should contain up to 5 users

