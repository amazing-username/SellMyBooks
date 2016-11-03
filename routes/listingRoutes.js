var express =require('express');
var router = express.Router();

router.get('/listings', function(req, res, next) {
	res.send('getting the listings...');
});

router.get('/deleteListing', function(req, res, next) {
	res.send('deleting a listing');
});

module.exports = router;
