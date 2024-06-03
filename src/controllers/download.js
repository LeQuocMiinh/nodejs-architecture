const httpStatus = require('http-status-codes');

// The `service` parameter will be injected
module.exports = (youtube, musicpleer) => {
    const getTracks = (req, res, next) => {
        const { tracks } = req._sanitized;
        console.log(tracks);

        res.json({ message: 'ok' });
    };

    return {
        getTracks
    };
};

module.exports._inject = ['youtube-service', 'musicpleer-service'];
