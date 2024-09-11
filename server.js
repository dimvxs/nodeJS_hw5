var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var path = require('path');

http.createServer(function(req, res) {

    // обработка ошибок запросв
    req.on('error', function (err) {
        console.log(err);
    }); 

    if (req.url == "/submit" && req.method == "POST") 
        {
            var filePath = './storage.txt';
            let storage = '';

            req.on('data', buffer =>{
                storage += buffer.toString();
            })

            req.on('end', () => {
                // Парсинг данных из запроса
                console.log('Data received:', storage);
                var query = querystring.parse(storage);
                var body = JSON.stringify(query); 

            var query = querystring.parse(storage);  
            var body = JSON.stringify(query);
            
            fs.writeFile(filePath, body, (err) => {
                if(err) throw err;
            });
         

            fs.readFile(filePath, function (err, data) { 

                // обработка ошибок
                if (err) {
                    console.log(err);
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.write('Not Found!');

                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' }); 
                    // записать в ответ содержимое читаемого файла 
                    res.write(data.toString());
                    res.write('success!');
                    
                    console.log(`success!`);

                }

                res.end();
            });

        });
    }

        else
            {
                var pathFile = path.join(__dirname, 'html', 'index.html');
        
                fs.readFile(pathFile, function(err, data){
                    if(err){
                        console.log(err);
                        res.writeHead(404, { 'Content-Type' : 'text/html'});
                        res.end('Not Found!');
                    }
                    else{
                        res.writeHead(200, { 'Content-Type' : 'text/html'});
                        res.write(data.toString());
                        res.end();
                    }
                })
            }

}).listen(8080, function(){
    console.log('the server is starting');
}); 




