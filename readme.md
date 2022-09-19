# Readme

## Summary

This a simple library where you create a list of users and randomly pick one of the users. You can also configure the list to remove the user or not when randomly chosen. This library also contains the "test-app" where unit tests for this library resides.

## Examples

Below are examples on how to use the library and it's methods.

Add users to the randomizer and generate a random user:

    const randomizer = new UserRandomizer(); //Initialize the randomizer.

    randomizer.addUser("name of user"); //Add a user to the randomizer.

    randomizer.addUserWith(1234, "name of user") //Add a user (with a specific id) to the randomizer.

    const chosenUser = randomizer.getRandomUser(); //Gets a random users from the users in the list.

Configure the randomizer to remove the user from the list when it has been randomly chosen:

    randomizer.getExecutionMode() //True if user is eliminated otherwise false.

    randomizer.shouldRemoveUserWhenChosen(boolean) //when true is provided, the user is eliminated from the list of users.

## Language and dependecies

### Library

JavaScript, any ECMA-script standard that supports modules.

### Test-app

If you want to run the unit tests contained in the test-app the following dependecies are required:

        "devDependencies": {
      "@babel/core": "^7.18.13",
      "@babel/preset-env": "^7.18.10",
      "@babel/register": "^7.18.9",
      "jasmine": "^4.3.0",
      "jasmine-spec-reporter": "^7.0.0"
    }

## Installation guidelines

1. Download the library from [GitHub](https://github.com/matthihat/randomify)
2. Import the UserRandomizer library from index.js from the directory where you have downloaded the library.

   import UserRandomizer from "{{yourpath}}/module/src/index.js";

3. Make sure you have enabled type module imports.

If you want to run the unit tests in the test-app:

1. Install dependencies using 'npm install'
2. Navigate to the test-app directory and run 'npm run test'
3. See results in console.

## Licensing

The [MIT License](https://opensource.org/licenses/mit).

## Version

1.0.0

## Releases

1.0.0

## Bug reporting & Contribution

Email me at

### Known issues
