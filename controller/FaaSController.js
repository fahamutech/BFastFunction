'use strict';

const childProcess = require('child_process');
const path = require('path');
const glob = require('glob');

module.exports.FaaSController = class {
    
    async cloneOrUpdate(repoInfo) {
        if(repoInfo.repository.clone_url){
            try{
                const deleteMyF = await childProcess.exec(`rm -r myF`,{cwd: path.join(__dirname, '../function/')});
                console.log(deleteMyF);
                const cloneMyF = await childProcess.exec(`git clone ${repoInfo.repository.clone_url} myF`, {cwd: path.join(__dirname, '../function/')});
                console.log(cloneMyF);
                const installMyF = await childProcess.exec(`npm install`, {cwd: path.join(__dirname, '../function/myF/')});
                console.log(installMyF);
                setTimeout(()=>{
                    console.log('functions updated, engine will restart');
                    childProcess.exec('pkill -u root');
                },5000);
            }catch(e){
                // send notification to email
                console.log(e);
            }
        }else{
            console.log('clone url not found');
        }
    }

    getNames() {
        return new Promise((resolve, reject) => {
            const result = [];
            glob(`${__dirname}/../function/**/*.js`, null, (err, files) => {
                if (err) {
                    reject({message: err});
                }
                files.forEach(element => {
                    const functionModule = require(element);
                    const functionNames = Object.keys(functionModule);
                    functionNames.forEach(functionName => {
                        result.push(functionName);
                    });
                });
                resolve({names: result});
            });
        });
    }
};
