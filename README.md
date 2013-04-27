****
Respond
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
Note: you can set these in any order you please.

Initiate the funtion: `var respond = require('respond');`

Set responses: `respond.on('what to listen for', 'what to respond with')`
NOTE: they don't have to be in order!

Set debug: `respond.debug(function(msg){ /*Handle message data*/ })`
Debug reports all strings to any functions you set to it.

Set error handlers: `respond.error(function(errMsg){ /*Handle Error*/ })`

Set end handlers: `respond.end(function(exitCode){ /*Handle End*/ })`

Example
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
        console.log('Exit code: ', code)
    })
```

License
-------
(MIT License)

Copyright 2013, Shane Gadsby

[twitter]: http://twitter.com/schme16
[github]: https://github.com/schme16
[email]: schme16@gmail.com

