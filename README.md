****
node-respond
=============
****
node-respond is an auto-responding Async `CLI`/`CMD` wrapper for `NodeJS` with a syntax based on 
`node-suppose` by jprichardson (https://github.com/jprichardson/node-suppose).


Why?
---
After searching around for a super simple way to format a HDD in `NodeJS` I settled
on using nodes `child_proccess`, but found responding to questions from the `CLI` an
absolute nightmare of spaghetti, and so this was born!

Installation
------------
    npm install respond
It's really that easy!

Usage
----
```
var respond = require('respond');

respond('npm', ['init'])
.on(/name\: \([\w|\-]+\)[\s]*/, 'awesome_package')
.on('version: (0.0.0) ', '0.0.1')
.on('description: ',"It's an awesome package man!")
.on('entry point: (index.js) ',"")
.on('test command: ','npm test')
.on('git repository: ', "")
.on('keywords: ', 'awesome, cool')
.on('author: ', 'Shane Gadsby')
.on('license: (BSD) ', 'MIT')
.on('ok? (yes) ', 'yes')
.error(function(err){
    console.log(err.message);
})
.end(function(code){
    var packageFile = '/tmp/awesome/package.json';
    fs.readFile(packageFile, function(err, data){
        var packageObj = JSON.parse(data.toString());
        console.log(packageObj.name); //'awesome_package'
    })
})
```

License
-------
(MIT License)

Copyright 2013, Shane Gadsby

[twitter]: http://twitter.com/schme16
[github]: https://github.com/schme16
[email]: schme16@gmail.com

