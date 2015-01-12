var express = require('express');
var router = express.Router();
var https = require('follow-redirects').https;

/* GET home page. */
router.get('/', function (req, res) {
    res.render('feed/index', {title: 'Feed Blog TI'});
});


router.get('/blogti', function (req, res) {
    var url = "https://some.feed/atom";
    res.writeHead(200, {
        'content-type': 'application/atom+xml'
    });

    https.get(url, function (r) {
        console.log('status:', r.statusCode);
        //console.log('headers: ' + JSON.stringify(r.headers));

        r.on('data', function (d) {
            console.log('got data', d);
            res.write(d, 'utf8');
        });

        r.on('close', function(r1) {
            console.log('call end');
            res.end();
        })
    });
    res.writeContinue();

});

module.exports = router;
