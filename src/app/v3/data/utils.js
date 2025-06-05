import fs from 'fs';

export const saveToDatabase = (/** @type {any} */ DB) => {
    fs.writeFileSync('./src/app/v1/data/db.json', JSON.stringify(DB, null, 2), {
        encoding: 'utf-8'
    });
};

export const getDatabase = () => {
   const DB = JSON.parse(fs.readFileSync('./src/app/v1/data/db.json').toString());
   return DB;
};