# pch-playwrigt-javascript-project
It's just practical application to perform entries for weekly sweepstakes on the site https://rewards.pch.com/weekly-grand-prize . Simple logic: login, find all entry points buttons, click on all of them in outer loop, then click on enter button for all allowed amount entries per day in inner loop.

I've created several asserts there: check, if login successful ("Sign Out" link is shown"); check, if all entries were performed for next week prize (entry button text change); check if all entries were performed for next week prize (class name is changed for buttons, where no allowed daily entries left). Grand prize entry button does not change class name, therefore I performed separate check for it: click and check for zero entries left inside.

Here I used POM to separate page objects and actions from the test file; inheritance from the BaseTest class to the page object classes; environment variables in .env file to hide real email and password, when I publish this code in GitHub.

It's a very useful time saving program performing 85 entries in three minutes.
