const jsonfile = require('jsonfile')
const fs = require('fs');
const npmJsonFile = './dist/ngx-md/package.json';
const mainJsonFile = './package.json';
const npmJsonObj = jsonfile.readFileSync(npmJsonFile);
const mainJsonObj = jsonfile.readFileSync(mainJsonFile);



npmJsonObj.version = mainJsonObj.version;
npmJsonObj.author = mainJsonObj.author;
npmJsonObj.repository = mainJsonObj.repository;
npmJsonObj.bugs = mainJsonObj.bugs;
npmJsonObj.homepage = mainJsonObj.homepage;
npmJsonObj.keywords = mainJsonObj.keywords;
npmJsonObj.license = mainJsonObj.license;
npmJsonObj.private = false;
npmJsonObj.dependencies.marked = mainJsonObj.dependencies.marked;
npmJsonObj.dependencies.prismjs = mainJsonObj.dependencies.prismjs;


jsonfile.writeFile(npmJsonFile, npmJsonObj, { flag: 'w', spaces: 2, EOL: '\r\n' }, function (err) {
    if (err) console.error(err)
});


// Add readme.md file
fs.createReadStream('./README.md').pipe(fs.createWriteStream('dist/ngx-md/readme.md'));