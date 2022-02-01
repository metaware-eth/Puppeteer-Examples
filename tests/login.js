/**
 * @name Metaware-eth
 * @desc Basic login tests
 */

const assert = require('assert')
const { expect } = require('chai')
const puppeteer = require('puppeteer')
let browser
let page

before(async () => {
  browser = await puppeteer.launch({ 
    headless: false
  })

  page = await browser.newPage()
})

beforeEach(async () => {
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto('https://www.saucedemo.com/', { waitUntil: 'networkidle0' })  
})

describe('Swag Labs Login', () => {
  const password = 'secret_sauce'

  it('should login successful', async () => {
    await page.type('#user-name', 'standard_user', { delay: 10 })
    await page.type('#password', password, { delay: 10 })
    await page.click('#login-button', { waitUntil: 'networkidle0' })
    
    expect(page.url()).to.equal('https://www.saucedemo.com/inventory.html')
  }).timeout(20000)

  it('should msg user of account lockout', async () => {
    await page.type('#user-name', 'locked_out_user', { delay: 10 })
    await page.type('#password', password, { delay: 10 })
    await page.click('#login-button', { waitUntil: 'networkidle0' })

    const errElem = '#login_button_container > div > form > div.error-message-container.error > h3'
    await page.waitForSelector(errElem)
    const element = await page.$(errElem)
    const value = await element.evaluate(el => el.textContent)
    
    expect(value).to.equal('Epic sadface: Sorry, this user has been locked out.')
  }).timeout(20000)

  it('should msg user of no account input', async () => {
    await page.click('#login-button', { waitUntil: 'networkidle0' })

    const errElem = '#login_button_container > div > form > div.error-message-container.error > h3'
    await page.waitForSelector(errElem)
    const element = await page.$(errElem)
    const value = await element.evaluate(el => el.textContent)
    
    expect(value).to.equal('Epic sadface: Username is required')
  }).timeout(20000)
})

after(async () => {
  await browser.close()
})