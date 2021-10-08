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


    expect(car).toEqual({
      id: expect.any(String),
      make: 'Chevy',
      model: 'Tahoe',
      year: 2001
    });
  });

  it('gets all cars within database', async() => {
    const car1 = await Car.insert({
      make: 'Chevy',
      model: 'Tahoe',
      year: 2001 });

    const car2 = await Car.insert({
      make: 'Chevy',
      model: 'Blazer',
      year: 2000 });

    const getCar = await Car.getAll();


    expect(getCar).toEqual([{
      id: expect.any(String),
      make: 'Chevy',
      model: 'Tahoe',
      year: 2001
    },
    {
      id: expect.any(String),
      make: 'Chevy',
      model: 'Blazer',
      year: 2000
    }]);

    afterAll(() => {
      return pool.end();
    });
  });

  it('gets car by id', async() => {
    const car1 = await Car.insert({
      make: 'Chevy',
      model: 'Tahoe',
      year: 2001 });

    const carId = await Car.getId('1');
    console.log('AT RETRIEVE ID ROUTE TEST', carId);

    expect(carId).toEqual({
      id: '1',
      make: 'Chevy',
      model: 'Tahoe',
      year: 2001
    });
  });

  it('removes car by id', async () => {
    const car1 = await Car.insert({
      make: 'Chevy',
      model: 'Tahoe',
      year: 2001 });
  });

  const carId = await Car.deleteId('1');
  expect(carId).toEqual({});
});
