var mongoose = require('mongoose');

var CitySchema = new mongoose.Schema({
    name: {
        type: String,
        index: true,
    },
    coordinates: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
    },
    temperature: {
        type: Number,
    },
});

CitySchema.path('name').required(true, 'City name cannot be blank');
CitySchema.path('coordinates').required(
    true,
    'City coordinates cannot be blank'
);
CitySchema.path('temperature').required(
    true,
    'City temperature cannot be blank'
);

mongoose.model('City', CitySchema);
