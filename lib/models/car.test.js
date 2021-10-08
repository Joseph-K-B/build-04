const fs = require('fs');
const { request } = require('http');
const pool = require('../utils/pool');
const Car = require('./car');

describe('Car model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync(__dirname + '/../../sql/setup.sql', 'utf-8'));
  });


  it('creates new car in SQL DB', async() => {
    const car = await Car.insert({
      make: 'Chevy',
      model: 'Tahoe',
      year: 2001 });

    console.log('AT CREATE ROUTE TEST', car);
    expect(car).toEqual({
      id: expect.any(String),
      make: 'Chevy',
      model: 'Tahoe',
      year: 2001
    });
  });

  afterAll(() => {
    return pool.end();
  });
});
