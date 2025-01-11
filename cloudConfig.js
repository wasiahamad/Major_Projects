const cloudinary = require('cloudinary').v2; // Import the Cloudinary library for image uploads and storage 
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // Import the Cloudinary storage for Multer 


// Set up Cloudinary for image uploads and storage 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, // Cloudinary account name 
    api_key: process.env.CLOUD_API_KEY, // Cloudinary API key
    api_secret: process.env.CLOUD_API_SECRET // Cloudinary API secret
});

// Set up Cloudinary storage for Multer 
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'wanderlust_DEV', // The name of the folder in Cloudinary where the images will be stored 
        allowed_formats: ['jpeg', 'png', 'jpg'], // The allowed image formats    
    },
});

// Export the Cloudinary and storage configuration 
module.exports = {
    cloudinary,
    storage
}
