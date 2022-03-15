Feature: User login

    Scenario: User succesfully logs in
        Given the user has an account
        When they submit there details
        Then they should be logged in
        And the response code should be 200 OK
        
    Scenario: User enters the wrong username and password
        Given the user the wrong username and password
        Then they should get a message telling them their details are incorrect
        And the response code should be 401 Unauthorized

