const streamifier = require('streamifier');
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

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