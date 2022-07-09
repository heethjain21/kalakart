const fs = require('fs');

const dir = "src/environments";
const file = "environment.prod.ts";
const content = `${process.env.FIREBASE_DETAILS}`;


fs.access(dir, fs.constants.F_OK, (err) => {

    // If directory doesn't exist, create it
    if (err) {
        console.log("folder doesn't exist, creating now at ", process.cwd());
        fs.mkdir(dir, {recursive: true}, (err) => {
            if (err) throw err;
        });
    }   

    // Write contents to file
    fs.writeFile(dir + "/" + file, content, { flag: 'w' }, function(err) {
        if (err) 
            return console.log('file error', err); 
        console.log("env file created successfully");
    }); 

});    