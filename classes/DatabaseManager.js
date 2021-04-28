const Crypto = require('crypto');
const fs = require('fs');

const Server = require('./Server');
const Player = require('./Player');
const Firewall = require('./Firewall');
const Upgrade = require('./Upgrade');
const HackingHandler = require('./HackingHandler');

module.exports = class DatabaseManager {
    constructor(){
        if(!fs.existsSync('utils/database.json')) fs.writeFileSync('utils/database.json', '[]');
        /** @type {Array} */ this.database = JSON.parse(fs.readFileSync('utils/database.json'));
    }

    /**
     * @param {String} password 
     * @param {String} salt 
     */
    hashPassword(password, salt){
        return Crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    }

    /**
     * @param {String} username 
     */
    userExists(username){
        return !!(this.database.filter(user => user.username == username)[0]);
    }

    /**
     * @param {String} username 
     * @param {String} password 
     * @returns {Object | null}
     */
    login(username, password){
        if(this.userExists(username)){
            return this.database.filter(user => user.username == username && user.password == this.hashPassword(password, user.salt))[0];
        }else{
            return null;
        }
    }

    /**
     * @param {String} username 
     * @param {String} password 
     */
    register(username, password){
        if(this.userExists(username)) throw new Error('Attempted to create duplicate user');
        var salt = Crypto.randomBytes(16).toString('hex');
        this.database.push({ username: username, password: this.hashPassword(password, salt), salt: salt, data: {} });
        fs.writeFileSync('utils/database.json', JSON.stringify(this.database, null, '   '));
    }
}