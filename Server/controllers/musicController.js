const fs = require('fs');
const Music = require('../models/Music');

// Handle music upload
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your account credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Get all music tracks
const getAllMusic = async (req, res) => {

    try {
        const music = await Music.find();
        res.json(music);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Handle music upload
const uploadMusic = async (req, res) => {
    try {
        const { title, artist, genre } = req.body;
        const files = req.files;

        // Check if any of the required fields are empty
        if (!files || !files['file'] || !files['coverImage'] || !title || !artist || !genre) {
            return res.status(400).json({ error: 'Missing required fields or files' });
        }

        const file = files['file'][0];
        const coverImage = files['coverImage'][0];

        let musicFileResult;
        let coverImageResult;

        // Upload cover image to Cloudinary
        coverImageResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload(coverImage.path, {
                timeout: 60000,
                folder: 'Cover images',
            }, (error, result) => {
                if (error) {
                    // Handle the error and reject the promise
                    reject(new Error('Failed to upload cover image'));
                } else {
                    // The upload was successful, resolve the promise with the result
                    resolve(result);
                }
            });
        });

        // Upload music file to Cloudinary
        musicFileResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload(file.path, {
                timeout: 60000,
                folder: 'Musics',
                resource_type: 'video',
            }, (error, result) => {
                if (error) {
                    // Handle the error and reject the promise
                    reject(new Error('Failed to upload music file'));
                } else {
                    // The upload was successful, resolve the promise with the result
                    resolve(result);
                }
            });
        });

        // Save music URLs and cover image URL to the database
        const music = await Music.create({
            file: {
                public_id: musicFileResult.public_id,
                secure_url: musicFileResult.secure_url,
            },
            coverImage: {
                public_id: coverImageResult.public_id,
                secure_url: coverImageResult.secure_url,
            },
            title: title,
            artist: artist,
            genre: genre,
        });
        // Delete the uploaded local files
        fs.unlink(file.path, (error) => {
            if (error) {
                console.error('Failed to delete music file:', error);
            }
        });

        fs.unlink(coverImage.path, (error) => {
            if (error) {
                console.error('Failed to delete cover image:', error);
            }
        });

        res.status(201).json({ message: 'Music uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to upload music' });
    }
};

// Update a music track by ID
const updateMusic = async (req, res) => {

    try {
        const { id } = req.body;
        const files = req.files;

        const music = await Music.findOne({ _id: id }).exec();
        if (!music) {
            return res.status(204).json({ message: `No music track matches ID ${id}.` });
        }

        if (files) {
            const file = req.files['file'] ? req.files['file'][0] : null;
            const coverImage = req.files['coverImage'] ? req.files['coverImage'][0] : null;

            if (coverImage) {
                // Upload cover image to Cloudinary
                const coverImageResult = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload(coverImage.path, {
                        timeout: 60000,
                        folder: 'Cover images',
                    }, (error, result) => {
                        if (error) {
                            // Handle the error and reject the promise
                            reject(new Error('Failed to upload cover image'));
                        } else {
                            // The upload was successful, resolve the promise with the result
                            resolve(result);
                        }
                    });
                });

                await cloudinary.uploader.destroy(music.coverImage.public_id);

                music.coverImage = {
                    public_id: coverImageResult.public_id,
                    secure_url: coverImageResult.secure_url,
                };
            }

            if (file) {
                // Upload music file to Cloudinary
                const musicFileResult = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload(file.path, {
                        timeout: 60000,
                        folder: 'Musics',
                        resource_type: 'video',
                    }, (error, result) => {
                        if (error) {
                            // Handle the error and reject the promise
                            reject(new Error('Failed to upload music file'));
                        } else {
                            // The upload was successful, resolve the promise with the result
                            resolve(result);
                        }
                    });
                });

                await cloudinary.uploader.destroy(music.file.public_id);
                // Update music track with new URLs
                music.file = {
                    public_id: musicFileResult.public_id,
                    secure_url: musicFileResult.secure_url,
                };
            }

            // Delete the uploaded local files
            if (file) {
                fs.unlink(file.path, (error) => {
                    if (error) {
                        console.error('Failed to delete music file:', error);
                    }
                });
            }
            if (coverImage) {
                fs.unlink(coverImage.path, (error) => {
                    if (error) {
                        console.error('Failed to delete cover image:', error);
                    }
                });
            }
        }

        if (req.body?.title) music.title = req.body.title;
        if (req.body?.artist) music.artist = req.body.artist;
        if (req.body?.genre) music.genre = req.body.genre;

        const updatedMusic = await music.save();

        res.status(201).json(updatedMusic);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a music track by ID
const deleteMusic = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'Music ID required.' });
    }

    const { id } = req.params;

    try {
        const music = await Music.findOne({ _id: id }).exec();
        if (!music) {
            return res.status(204).json({ "message": `No music track matches ID ${id}.` });
        }

        const result = await music.deleteOne();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAllMusic, uploadMusic, updateMusic, deleteMusic };
