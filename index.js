// const Readable = require('stream').Readable;
// let rs = Readable()
/* stream the alphabet! without typing it out using a stream and charCode */
// let c = 97 -1;
// rs._read = function () {
//     //we use the read function 
//     // we increment our count as this is being read
//     //because it's synchronous our next line is a condition that will check if the character is z
//     //if it's z then we rs.push(null) which finishes the stream
//     if( c > 'z'.charCodeAt(0)) {
//         return rs.push(null)
//     }
//     setTimeout(() =>{
//         rs.push(String.fromCharCode(++c))
//     }, 100)
// }
// rs.pipe(process.stdout)
/* Process completion */
// process.on('exit', function(){
//     console.error(`\n_read() called ${c - 97} times`)
// })
// process.stdout.on('error', process.exit)
/* ------------- Consuming data stream ------------ */
// process.stdin.on('readable', () =>{
//     let buf = process.stdin.read();
//     console.dir(buf)
// })
//read() takes a number that represent the byte chunks 

// Converting buf to string to verify
// process.stdin.on('readable', () =>{
//     const buf = process.stdin.read();
//     console.dir(buf)
//     if(buf == null) console.dir('null value')
//     else if( buf != null) {
//     let trans = buf.toString();
//     console.dir(trans)
//     }
// })

/* ----- Chunk In Three Read Whole -------- */
// process.stdin.on('readable', function(){
//     const buf = process.stdin.read(3);
//     console.dir(buf);
//     process.stdin.read(0);
// })

/* 
----------------Unshift -------------------
    Used to prevent unecessary copies of buffers to save memory
*/
    // process.stdin.on('readable', () =>{
    //     let buf = process.stdin.read();
    //     if(!buf) return;
    //     buf.map((buffer, index, bufferArray) =>{
    //         if(buffer === 0x0a) {
    //             console.dir(bufferArray.slice(0, index).toString());
    //             buf = bufferArray.slice(index + 1);
    //             index = 0
    //             process.stdin.unshift(bufferArray)
    //             return ;
    //         }
    //     })
    //     process.stdin.unshift(buf)
    // })

    let offset = 0;

    process.stdin.on('readable', () =>{
        let buf = process.stdin.read();
        if(!buf) return;
        for (; offset < buf.length; offset++) {
            console.dir(buf.slice(0, offset).toString());
            buf = buf.slice(offset + 1);
            offset = 0;
            process.stdin.unshift(buf);
            return ;            
        }
        process.stdin.unshift(buf)
    })

    /* 
    ------------writeable streams -------------
    Streams you can pipe() to but not from

    src.pipe(writableStream)
     */

     // Creating a writable stream

    //  const Writable = require('stream').Writable;
    //  const ws = Writable();
    //  ws._write = (
    //      chunk, // first argument is the data written by the producer
    //      enc,  // enc is a string with a string encoding when opts.decodeString is false
    //      next // the next argument is the callback that tells the consumer that i t can write more data
    //      // you can pass an error object err, which emits an 'error' event on the stream instance
    //      // If the readable stream you're piping from writes strings, they will be converted into Buffers unless you create a Writable({ decodeString: false })
    //      // if the readable stream you're pping from writes objects , create your writahbe stream with Writable({ objectMode: true })
    //      ) =>{
    //      console.dir(chunk);
    //      console.dir(chunk.toString())
    //      next();
    //  };

    //  process.stdin.pipe(ws);

// ----------- Writing to a Writable Stream ------------

// process.stodout.write('beep boop\n');

// To tell the destination writable stream that your done writing just call .end(). You can also give .end(data) some data to write before ending:

const fs = require('fs');
const ws = fs.createWriteStream('message.txt');

ws.write('beep\n');

setTimeout(() =>{
    ws.end('boop\n');
}, 1000);

// If you care about high water marks and buffering, .write() returns false when there is more data than the opts.highWaterMark option passed to Writable() in the incoming buffer.

// If you want to wait for the buffer to empty again, listen for a 'drain' event.

// Transform

// A type of duplext streams (both readable and writable) the distinction is the output is calculated from the input

// You might also hear transform streams referred to as "through streams"
// Through streams ar simple readable/writable filters that transform input and produce output

//--------- Duplex ---------

//Duplex streams are readable/writable and both ends of the stream engage in a two-way interaction sending back and forth messages like a telephone.
// An rpc exchange is a good example of a duplext stream. Any time you see something like: 
// a.pipe(b).b.pipe(a) you're probable dealing with a duplex stream 