const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');

module.exports = (publicId, buffer) => {
    return new Promise((resolve, reject)=>{
        cloudinary.uploader.destroy(publicId, function(result){
            const uploadStream = cloudinary.uploader.upload_stream({},(error, result)=>{
                if(result) {
                    resolve(result);
                }else {
                    reject(error);
                }
            });
            streamifier.createReadStream(buffer).pipe(uploadStream);
        });
    });
};