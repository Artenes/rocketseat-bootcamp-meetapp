import Sequelize, { Model } from 'sequelize';
import { isBefore } from 'date-fns';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        localization: Sequelize.STRING,
        date: Sequelize.DATE,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'image_id', as: 'banner' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'organizer' });
  }

  isOrganizedBy(user) {
    return this.user_id === user.id;
  }

  hasPassed() {
    return isBefore(this.date, new Date());
  }
}

export default Meetup;
