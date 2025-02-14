// /controllers/serviceController.js
const Service = require('../models/Service');

// Get all services from the database
const getAllServices = async (req, res) => {
  try {
    console.log('Fetching services...');
    const services = await Service.find();
    console.log('Fetched services:', services); // This should log the services
    if (!services || services.length === 0) {
      console.log('No services found');
    }
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const { price, name, description, image } = req.body;
    const newService = new Service({ price , name , description , image });
    await newService.save();
    res.status(201).json(newService);  // Return the created service
  } catch (err) {
    console.error('Error creating service:', err);  // Log any errors
    res.status(500).json({ error: 'Internal Server Error' });  // Return a 500 error if there is an issue
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, name, description, image } = req.body;
    const updatedService = await Service.findByIdAndUpdate( id, { price, name, description, image },
      { new: true } // Trả về dữ liệu sau khi cập nhật
    );
    if (!updatedService) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(updatedService);
  } catch (err) {
    console.error('Error updating service:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error('Error deleting service:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Create a new service (just in case you need it)
// const createService = async (req, res) => {
//   try {
//     // const { price, name, description, image } = req.body;
    
//     const newService = new Service({ price : 5.99, name : 'abcd', description : 'abc', image : 'abc' });
//     await newService.save();
//     res.status(201).json(newService);  // Return the created service
//     const services = await Service.find();
//     console.log('Fetched services:', services); // This should log the services
//     res.status(200).json(services);
//   } catch (err) {
//     console.error('Error creating service:', err);  // Log any errors
//     res.status(500).json({ error: 'Internal Server Error' });  // Return a 500 error if there is an issue
//   }
// };

// const addMultipleServices = async (req, res) => {
//   try {
//     const services = req.body; // Expecting an array of services
//     if (!Array.isArray(services) || services.length === 0) {
//       return res.status(400).json({ message: "Invalid data. Please provide an array of services." });
//     }

//     const addedServices = await Service.insertMany(services);
//     res.status(201).json({ message: "Services added successfully", data: addedServices });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding services", error: error.message });
//   }
// };

module.exports = { createService, getAllServices,updateService,deleteService };
