const filestack = require('filestack-js');
const fs = require('fs');
const request = require('request');
const apikey = 'AC7jvZAmQseWUNWfP5dWxz';
const client = filestack.init(apikey);
const token = {}

resulter()
async function resulter() {

    try {
        const a = await clientUpload('/test.jpeg')
        const b = await downloader(createSmallUrl(a),async (data) =>{
            let result = await clientUpload(data)
            console.log(result);
            return result
        });

    }
    catch(e) {
        console.error(e.message)
    }

}
async function clientUpload(filename) {
    const result = await client.upload(__dirname + filename)
    return result.url
}

async function downloader(url, cb){
    let file = await fs.createWriteStream('placeholder.jpeg')
    request.get(url).on('response', () =>{}).pipe(file).on('close', () => {
    })
    file.on('finish', async() =>{
         console.log('Finished writing file')
         cb('/placeholder.jpeg')
    })
    fs.exists(__dirname + '/placeholder.jpeg', () => {})
}
function createSmallUrl(url) {
    let splitUrl = url.split('/');
    splitUrl.splice(-1, 0, 'resize=width:300,height:200,fit:crop', 'crop=d:[0,0,300,200]');
    return splitUrl.join('/');
}

function remover(filename) {
    return fs.unlink(filename)
}
function urlReturner() {
    let url = clientUpload('/test.jpeg')
    console.log(url, '=======$$$$$$====')
    let downloadUrl = createSmallUrl(url)
    console.log(downloadUrl, '@#$@#$@#$@$@#$@$@#$@#$@#$')
    downloader(downloadUrl)
    fs.existsSync(__dirname + '/placeholder.jpeg', (err, data) =>{
        if(err) console.error(err.message)
        else if(data) {
            console.log(data)
        }
    })
}
function finalUploader() {
    urlReturner();
    clientUpload('/placeholder.jpeg');
    
}

// finalUploader()
// const http = require('http')
//  //assigned create server to a variable
//  const server = http.createServer()
//  console.log(server);
//  //server variable is used to capture a request event
//  //server variable is used to capture a connection event
//  server.on('connection', () =>{
//    console.log('connection event');
//  })
// server.listen(8124, () =>{
//   console.log('listening event');
// });
// console.log('Server running on port 8124');