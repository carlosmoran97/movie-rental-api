const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');

module.exports = (buffer) => {
    return new Promise((resolve, reject)=>{
        const uploadStream = cloudinary.uploader.upload_stream({},(error, result)=>{
            if(result) {
                resolve(result);
            }else {
                reject(error);
            }
        });
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};