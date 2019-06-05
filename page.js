const {
    Builder,
    By,
    until
} = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');
let o = new chrome.Options();
// o.addArguments('start-fullscreen');
o.addArguments('disable-infobars');
// o.addArguments('headless'); // running test on visual chrome browser
o.setUserPreferences({
    credential_enable_service: false
});

var warwickHomepage = "http://warwick.ac.uk/";

this.driver = new Builder()
    .setChromeOptions(o)
    .forBrowser('chrome')
    .build();


function getURL(theUrl) {
    this.driver.get(theUrl);
};

getURL(warwickHomepage);

