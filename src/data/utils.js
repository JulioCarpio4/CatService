import fs from 'fs'

const saveToDatabase = (DB) => {
    fs.writeFileSync('./src/data/db.json', JSON.stringify(DB, null, 2), {
        encoding: 'utf-8'
    })
}

const getDatabase = () => {
   const DB = JSON.parse(fs.readFileSync('./src/data/db.json'))
   return DB
}

export {
    saveToDatabase,
    getDatabase
}