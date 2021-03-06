const pool = require('../utils/pool');


module.exports = class Car {
  id;
  make;
  model;
  year;

  constructor(row){
      this.id = row.id;
      this.make = row.make;
      this.model = row.model;
      this.year = row.year;
  }

  //CREATE
  static async insert({ make, model, year }) {
    const { rows } = await pool.query(
        `INSERT INTO cars (make, model, year)
        VALUES($1, $2, $3)
        RETURNING *`,
        [make, model, year]
    );
    return new Car(rows[0]);
  }


  //RETRIEVE ALL
  static async getAll() {
      const { rows } = await pool.query(
          'SELECT * FROM cars'
      );

    //   console.log('AT CAR MODEL', rows)
      return rows
  }
  
  static async getId(id){
      const { rows } = await pool.query(`
      SELECT * FROM cars
      WHERE id = $1`, [id]
      );
      return new Car(rows[0]);
    }

    static async deleteId(id){
        const { rows } = await pool.query(
            'DELETE FROM cars WHERE id = $1', [id]
        );
        return rows
    }
};

// module.exports = Car;
