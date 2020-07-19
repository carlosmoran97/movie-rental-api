const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');
// =========================================================================================================
// Cloudinary is Streamline media management and improve user experience by automatically delivering images
// and videos, enhanced and optimized for every user.
// 
// This method delete an existing image and uploads a new one.
// =========================================================================================================
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