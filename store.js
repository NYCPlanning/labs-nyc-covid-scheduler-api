const fortune = require('fortune');
const mongodbAdapter = require('fortune-mongodb');

const { Adapter } = fortune;
const MongodbAdapter = mongodbAdapter(Adapter);

class ApplicationAdapter extends MongodbAdapter {
  // override find to ignore all index requests
  // async find(...args) {
  //   const [type, ids] = args;

  //   // if requesting a project and no ids (all)
  //   if (type === 'appointment' && !ids) return [];

  //   return super.find(...args);
  // }
}

const adapter = [ApplicationAdapter, {
  url: process.env.MONGODB_URI,
  useNewUrlParser: true,
}];

const store = fortune({
  slot: {
    hour: Date,
    appointments: [Array('appointment'), 'slot'], // eslint-disable-line
  },
  appointment: {
    name: String,
    isOverSixtyFive: Boolean,
    isSymptomatic: Boolean,
    licensePlate: String,
    slot: ['slot', 'appointments'],
  },
}, { adapter });

module.exports = store;
