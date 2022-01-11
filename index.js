#!/usr/bin/env node

import fs from 'fs';

// import util from 'util';

import path from 'path';

import chalk from 'chalk';

// Method #1
// const lstat = (file) => {
//     return new Promise((resolve, reject) => {
//         fs.lstat(file, (err, stats) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(stats);
//         });
//     });
// };

//  Method #2
// const lstat = util.promisify(fs.lstat);

//  Method #3
const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, files) => {
    if (err) {
        throw new Error(err);
    }

    const statPromises = files.map((file) => {
        return lstat(path.join(targetDir, file));
    });

    const allStats = await Promise.all(statPromises);

    for (let stats of allStats) {
        const index = allStats.indexOf(stats);
        if (stats.isFile()) {
            console.log(chalk.green(files[index]));
        } else {
            console.log(chalk.bold.italic.blue(files[index]))
        }
    }
});

