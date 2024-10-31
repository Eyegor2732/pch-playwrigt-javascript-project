const base = require('@playwright/test');

exports.customtest = base.test.extend (
    {
        testData: {
            email : process.env.EMAIL,
            password : process.env.PASSWORD
        }
    }
)