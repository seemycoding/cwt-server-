const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

const fileUpload = require('../config/fileUpload')

const ArticleController = require('../controllers/Article')
const NewsController = require('../controllers/News')
const WaterDataController = require('../controllers/WaterData')
const KnowlegdeController = require('../controllers/Knowledge')
const UpComingEvent = require('../controllers/UpComingEvent')
    // add to test
router.get('/Article', ArticleController.index)
router.get('/Article/:id', ArticleController.byId)
router.post('/Article', fileUpload.single('image'), ArticleController.create)

router.get('/News', NewsController.index)
router.get('/News/:id', NewsController.byId)
router.post('/News', fileUpload.single('image'), NewsController.create)

router.get('/WaterData/:state', WaterDataController.byState)
router.post('/WaterData', WaterDataController.create)

router.get('/Knowledge/:type', KnowlegdeController.byType)
router.post('/Knowledge', upload.array("image", 3), KnowlegdeController.create)

router.get('/UpComingEvent', UpComingEvent.index)
router.post('/UpComingEvent', UpComingEvent.create)

module.exports = router;