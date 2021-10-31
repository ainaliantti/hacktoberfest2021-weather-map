var City = require('../models/city');

exports.getCity = async (query) => {
    return await City.find(query).catch((e) => {
        throw Error('Error while finding city');
    });
};
