const app = require('../../app')
const request = require('supertest')

describe('App Tests', () => {
  test('Case: Get from users', async () => {
    /******************************* ARRANGE *******************************/

    /********************************* ACT *********************************/
    const response = await request(app).get('/users')

    /******************************** ASSERT *******************************/
    expect(response.statusCode).toBe(200)
  })
})
