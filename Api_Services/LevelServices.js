const { Level } = require('../DataAccesLayer/Level');

exports.getlevels = async () => {
  const levels = await Level.findAll();
  return levels;
};

exports.addlevel = async (title, description) => {
  const level = await Level.create({
    Title: title,
    Description: description
  });
  return level.ID;
};

exports.deletelevel = async (ID) => {
  const result = await Level.destroy({ where: { ID: ID } });
  return result > 0;
};