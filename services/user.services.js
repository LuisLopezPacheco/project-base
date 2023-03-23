const pool = require('../libs/postgres.pool');

class users {
  constructor(){
    this.pool = pool;
    this.pool.on('error', (err) => {
      console.error(err);
    })
  }
  async getUsers() {
    const query = 'SELECT * FROM users ORDER BY user_id ASC';
    const rta =  await this.pool.query( query );
    // console.log(rta);
    return rta.rows;
  }

}


module.exports =  users;

