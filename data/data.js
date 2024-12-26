import base from '@playwright/test';

exports.customtest = base.test.extend(
    {
        testData: {
            email: process.env.EMAIL,
            password: process.env.PASSWORD,
            afterButtonColor: "rgb(255, 188, 2)",
            beforeButtonColor: "rgb(16, 110, 211)"
        }
    }
)