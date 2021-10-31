var CitySevice = require('../services/user.service');

exports.getCity = async (req, res, next) => {
    try {
        var city = await CitySevice.getCity({}, page, limit);
        return res.status(200).json({
            status: 200,
            data: city,
            message: 'Succesfully retrieved city',
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
