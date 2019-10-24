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

    let meetupsToInsert = [];
    let now = datefns.setHours(datefns.setMinutes(new Date(), 0), 0);

    for (let i = 0; i < 48; i++) {
        const number = i + 1;
        meetupsToInsert.push({
          title: `Tech day ${number} meetup`,
          description: `Evento sobre tech ${number}`,
          localization: `Rua ${number}, ${i}`,
          date: now,
          image_id: files[Math.floor(Math.random() * 2)].id,
          user_id: users[Math.floor(Math.random() * 3)].id,
          created_at: new Date(),
          updated_at: new Date(),
        });
        now = datefns.addHours(now, 1);
    }

    return queryInterface.bulkInsert('meetups', meetupsToInsert);

  },

  down: (queryInterface, Sequelize) => {
    // do nothing.
  }
};
