# pch-playwrigt-javascript-project
It's just a practical application to perform entries for Super Prize on the site https://pch.com and for weekly prizes  on the site https://rewards.pch.com/weekly-grand-prize . Simple logic: login, find all entry points buttons, click on all of them in outer loop, then click on enter button for all allowed amount entries per day in inner loop.

I've created several asserts there: 
check, if login successful ("Sign Out" link is shown"); 
check, if all entries were performed for other weekly prizes (entry button color change); 
Super prize entry button does not change its class name or color, therefore I performed separate check for it: click and check for zero entries left inside.

Here I used POM to separate page objects and actions from the test file; 
inheritance from the BaseTest class to the page object classes; environment variables in .env file to hide real email and password, when I publish this code in GitHub; 
separate file to keep data objects for easier maintenance.

It's a very useful time saving program performing 85 entries in frond a half minutes.

