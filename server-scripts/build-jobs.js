const { writeFile } = require('fs');
const chunk = require('lodash/chunk');
const { v4: uuidv4 } = require('uuid');

const sqlinkJobs = require('../static/json/jobs/sqlink.json');

function createSqlinkJobChunks() {
    const sqlinkJobsChunked = chunk(sqlinkJobs, 100);
    sqlinkJobsChunked.forEach((jobsChunk, i) => {
        const _jobsChunk = jobsChunk.map(job => ({...job, id: uuidv4()}));
        writeFile(`../static/json/jobs/sqlink-${i}.json`, JSON.stringify(_jobsChunk), () => {});
    });
}

createSqlinkJobChunks();