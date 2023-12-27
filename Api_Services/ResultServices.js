const { Result } = require('../DataAccesLayer/Result');
const express = require('express');
//const { Leaders } = require('../models/Leaders');

exports.getresults = async () => {
  const results = await Result.findAll();
//   const leaders = results.map((r) => new Leaders(r.UserID, r.Level, r.Time, r.Points));
//   return leaders;
};

exports.addresult = async (userId, level, time, points) => {
  const result = await Result.create({
    UserID: userId,
    Level: level,
    Time: time,
    Points: points
  });
  return result.ID;
};

exports.deleteresult = async (ID) => {
  const result = await Result.destroy({ where: { ID: ID } });
  return result > 0;
};