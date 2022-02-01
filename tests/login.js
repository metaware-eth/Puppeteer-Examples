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
    // login flow 
    await page.type('#user-name', 'standard_user', { delay: 50 })
    await page.type('#password', password, { delay: 50 })
    await page.click('#login-button', { waitUntil: 'networkidle0' })
    
    expect(await page.url()).to.equal('https://www.saucedemo.com/inventory.htm;')
  }).timeout(20000)
})

after(async () => {
  await browser.close()
})