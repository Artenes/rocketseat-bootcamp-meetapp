const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const datefns = require('date-fns');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const hashedPassword = await bcrypt.hash('secret', 8);
    const bannersFolder = path.resolve(__dirname, '..', '..', '..', 'test-banners');
    const destination = path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads');

    fs.mkdirSync(destination, { recursive: true });

    fs.readdirSync(bannersFolder).forEach(async (file, index) => {

      fs.copyFileSync(path.resolve(bannersFolder, file), path.resolve(destination, file));

      try {
        await queryInterface.bulkInsert('files', [
          {
            name: file,
            path: file,
            created_at: new Date(),
            updated_at: new Date(),
          }
        ]);
      } catch (error) {
        console.log(`${file} already exists`);
      }

    });

    try {
      await queryInterface.bulkInsert('users', [
        {
          name: 'Monique Fernandes',
          email: 'monique@email.com',
          password_hash: hashedPassword,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Diego Khasly',
          email: 'diego@email.com',
          password_hash: hashedPassword,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Sereny Mhaia',
          email: 'sereny@email.com',
          password_hash: hashedPassword,
          created_at: new Date(),
          updated_at: new Date(),
        }
      ]);
    } catch (error) {
      console.log('Users already exists');
    }

    const files = (await queryInterface.sequelize.query('SELECT id FROM files ORDER BY id DESC LIMIT 2'))[0];

    const users = (await queryInterface.sequelize.query('SELECT id FROM users ORDER BY id DESC LIMIT 3'))[0];

    return queryInterface.bulkInsert('meetups', [
      // already happened
      {
        title: 'Node Js meetup',
        description: 'Evento sobre Node JS',
        localization: 'Rua silveira, 25',
        date: new Date(),
        image_id: files[0].id,
        user_id: users[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      // happens today
      {
        title: 'React Js meetup',
        description: 'Evento sobre React JS',
        localization: 'Estrada japonesa, 90',
        date: datefns.setHours(new Date(), 23),
        image_id: files[1].id,
        user_id: users[1].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      // happens tomorow
      {
        title: 'React Native meetup',
        description: 'Evento sobre React Native',
        localization: 'Cruzamento Rheiq, 190',
        date: datefns.addDays(new Date(), 1),
        image_id: files[0].id,
        user_id: users[2].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      // happens tomorow
      {
        title: 'Yarn meetup',
        description: 'Evento sobre Yarn',
        localization: 'Avenida central, 340',
        date: datefns.addDays(new Date(), 1),
        image_id: files[1].id,
        user_id: users[1].id,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);

  },

  down: (queryInterface, Sequelize) => {
    // do nothing.
  }
};
