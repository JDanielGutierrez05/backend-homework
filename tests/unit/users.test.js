const app = require('../../app')
const request = require('supertest')

jest.mock('../../repositories/Connection')

describe('Users Tests', () => {
  test('Case: Get from users', async () => {
    /******************************* ARRANGE *******************************/

    /********************************* ACT *********************************/
    const response = await request(app).get('/users')

    /******************************** ASSERT *******************************/
    expect(response.statusCode).toBe(200)
  })

  test('Case: create user validation fail with empty password', async () => {
    /******************************* ARRANGE *******************************/

    /********************************* ACT *********************************/
    const response = await request(app).post('/users').send({
      user: 'test@test.com',
      password: '',
    })

    /******************************** ASSERT *******************************/
    expect(response.statusCode).toBe(400)
  })
})
