const students = require('./student-data.json');
var config = require('./config');

const baseMoodleURL = "https://moodle.warwick.ac.uk/user/index.php?id=";
const url = baseMoodleURL + config.moodleCourseID;

const webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;
const driver = new webdriver.Builder().forBrowser('chrome').build();


driver.get(url);

// get past single sign-on
driver.findElement({
    name: 'userName'
}).sendKeys(config.username);
driver.findElement({
    name: 'password'
}).sendKeys(config.password);

driver.findElement({
    id: 'signinbutton'
}).click();


// wait for two step auth page to load
driver.wait(until.elementLocated(By.name('twoFactorVerificationCode')), 5 * 1000).then(el => {
    el.sendKeys(config.verificationCode);
    driver.findElement({
        name: 'twoFactorTrustDuration'
    }).sendKeys('week');

    driver.findElement(webdriver.By.css('#twoFactorTrustDuration > option:nth-child(2)'))
        .click();
    driver.findElement({
        id: 'signinbutton'
    }).click();
});


// wait for Moodle user enrolmment page to load
driver.wait(until.elementLocated(By.id('enrolusersbutton-1')), 5 * 1000).then(el => {
    driver.findElement(webdriver.By.css('.m-y-1')).click();
});

driver.wait(until.elementLocated(By.id('mform1')), 5 * 1000).then(el => {
    driver.findElement(webdriver.By.css('#id_main > div.fcontainer > div.form-group > div.form-inline > input')).sendKeys(students[0].Uni_ID);
    
});

function addStudents() {

    students.forEach(student => {
        
    });
};


