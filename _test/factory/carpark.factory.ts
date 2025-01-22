import { Carpark } from '../../src/models/carpark.model';

export const createTestCarpark = async (overrides = {}) => {
  return await Carpark.create({
    car_park_no: 'C123',
    address: '123 Test Street',
    x_coord: 1.12345,
    y_coord: 103.12345,
    car_park_type: 'MULTI-STOREY',
    type_of_parking_system: 'ELECTRONIC PARKING',
    short_term_parking: 'YES',
    free_parking: 'NO',
    night_parking: 'YES',
    car_park_decks: 5,
    gantry_height: 2.1,
    car_park_basement: 'NO',
    ...overrides, // Allow customization of test data
  });
};
