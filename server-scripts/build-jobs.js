const { writeFile } = require('fs');
const chunk = require('lodash/chunk');

const sqlinkJobs = require('../static/json/jobs/sqlink.json');

const chunks = Number(process.argv[2]);

function createSqlinkJobChunks() {
    const sqlinkJobsChunked = chunk(sqlinkJobs, chunks);
    sqlinkJobsChunked.forEach((jobsChunk, i) => {
        writeFile(
            `../static/json/jobs/sqlink-${i+1}.json`, 
            JSON.stringify(jobsChunk), 
            () => {}
        );
    });
}

createSqlinkJobChunks();