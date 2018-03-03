var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    var filename = '.' + req.url;
    
    if (filename === './stream') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        
        res.write('retry: 10000\n');
        res.write('event: connecttime\n');
        res.write('data:' + (new Date()) + '\n\n');
        res.write('data:' + (new Date()) + '\n\n');
        
        interval = setInterval(function () {
            res.write('data' + (new Date()) + '\n\n');
        }, 1000);
        
        req.connection.addListener('close', function () {
            clearInterval(interval);
        },false);
    } else {
        fs.readFile('./eventSource.html', 'utf-8', function (err, html) {
            if (err) {
                console.log(err);
                return;
            }
            res.end(html);
        });
    }
}).listen(9001);
