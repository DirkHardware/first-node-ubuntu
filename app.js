var _ = require('underscore');

var result = _.contains([1,2,3], 2)
console.log(result)

// const http = require('http')

// const server = http.createServer((req, res)=>{
//     if (req.url === '/'){
//         res.write(`Get your yankee ass off my property.`);
//         res.write(`\nI don't care if the bank gave you the deed.`)
//         res.end();
//     };

//     if (req.url === '/unknown/hinson'){
//         res.write(JSON.stringify([1, 2, `School? Ain't that the damn place they got all them uhhh, let's see, watcha call 'um, uhh? Fold outs covered in scribblings wrote up all over?`]))
//         res.end()
//     }
// });

// server.on('connection', (socket) => {
//     console.log('new connection')
// });

// server.listen(3000);

// console.log('Listening on Port 3000...')

// something