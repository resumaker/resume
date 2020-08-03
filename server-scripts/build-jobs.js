const { writeFile } = require('fs');
const chunk = require('lodash/chunk');

const sqlinkJobs = require('../static/json/jobs/sqlink.json');

function createSqlinkJobChunks() {
    const sqlinkJobsChunked = chunk(sqlinkJobs, 100);
    sqlinkJobsChunked.forEach((jobsChunk, i) => {
        writeFile(`../static/json/jobs/sqlink-${i}.json`, JSON.stringify(jobsChunk), () => {});
    });
}

createSqlinkJobChunks();