const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMERBNzYvUmFhbHlMRmJyd0IzVnRLV0s0bWJBVG40aUZkWXIzNEFud3VIQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVSt3YUh3Z2k3YW5UNzhobzlEdXBOaFhPTzh4RElOSzZYeU5mVFN1a0tnND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVSFpXN3MvZW1CaVM0WkgwMzNzSitLa3NDczV5dnNWU09MSkpPTGZYckhFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQalV3TFJBdVg1djhadHdyMlFZRjlVdVFTZS9QZHFORlY2TkEzSmpCVXdvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBBRjN2RENWbndFVi9pc2xMVkMwVlAyaEYvdDIzcTJ3dU9DM2hXeFF6Mlk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRXVk0rdUQvMUYrc09XYU9Ib3kzaE5tUFlmMmlic3FJdWkxcVlGZ2VaUWs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibU5PcDQyZnhCZUx0eXdDSVdrM0trYzJEUld4bDVwVGFueVpJaUVVLzZGcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU0xRlhvT2tWZ3BYWEwvWEtOY2tFMXgyU2tjb2hkU01NbDdXZklJREZqZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjEzcmpKS25oLy9QNU1PbVdBeXQrdW5Xb3lkSHd6OTJ1RDZ5SGozUEdzVzN4a2NVVVllSkhQczFHRGJXOUpvZkVMZTFSRkRwM2Y5MWx5ZkkveGVlaWlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg3LCJhZHZTZWNyZXRLZXkiOiJmc1hmVnhmQWVRYkF2MEJpbDRCeitUaTQ0dmJFZ29haDQ0T2VVNW9ya2R3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2MzcxNTUxMTQzNEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI2NjFDMzFGRkE5QkNGMDcyQzA3QUUxOTAzQ0EzOTAyMiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI1MTU0MTk3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3MTU1MTE0MzRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMTk4NEVEOERCOUM3RDZFOEQ1MUU4OEY2RTYyNzI3NEQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNTE1NDE5OH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiN1NKQUxIM3pRcktjdDMyZ1R5TXB2ZyIsInBob25lSWQiOiI3YzdmOTFhYS01NmVlLTQwN2EtOGYxZi1iNjg4NWQ4NDY2YjkiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoick81ZXRKVm1vSkg1OUdqeTdYOWFvV2p3dVJJPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFveVp4cGExSTZ3OFdBc0pSY2xnTE45N1BFWT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJaU1k5RzRGWCIsIm1lIjp7ImlkIjoiMjYzNzE1NTExNDM0OjZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQ1lCRVJfRkxBVyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS2FYMThrSEVQMkd6N1lHR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTURnTnpINjVocmRqYk5HN2JRUXF0SFJqVDlMSUFQOXloMTZoVy9tMnBWWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiWWhVNFFLTWY1eW83TUZGalloTnNieTgvTVdZdjlpa1JPbzBmV0VxL2J3SjVXNEg2R0F1T2ppVzIxdWdnZlpVNVFCdnVoTWJudWJybTJvMC9WUnRTQ1E9PSIsImRldmljZVNpZ25hdHVyZSI6ImY0Z2FMY0ZYZGxhU0g3MkVOQy80a3QzR0JrNHZJR3dUcmdST3o1M2xnRzljOWZ4WTJWZzFiaUdFbkhxNXZsRmFnajNoelZHbVdCSmxRR3AwNHNlZWlBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzE1NTExNDM0OjZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVEE0RGN4K3VZYTNZMnpSdTIwRUtyUjBZMC9TeUFEL2NvZGVvVnY1dHFWVyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNTE1NDE4NiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPYTYifQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "CYBER_FLAW",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "263715511434", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

