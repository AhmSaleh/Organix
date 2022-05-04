/* ----------------------------- default values ----------------------------- */
const SALTROUNDS = "13"
const MONGO_URI = "mongodb://localhost:27017/Users"
const JWT_SECRET = "secret"
const JWT_EXPIRES = "3600" // in seconds = 1 hour
const DEFAULTADMINEMAIL = "admin@email.com"
const DEFAULTADMINPASSWORD = "admin"
/* ------------------------------ end defaults ------------------------------ */






function throwIfMissing(env: string, name:string) {
    if (process.env.node_env === "production" && !process.env[name]) {
        throw new Error(`Missing enviroment variable ${name}`);
    }
}



class envconf{
    get MongoDB():string {    
        throwIfMissing("production", "MONGO_URI");
        return process.env.MONGO_URI ?? MONGO_URI;
    }
    get SaltRounds():number {
        return parseInt(process.env.salt_rounds ?? SALTROUNDS);
    }

    get JWT_SECRET():string {
        throwIfMissing("production", "JWT_SECRET");
        return process.env.JWT_SECRET ?? JWT_SECRET;
    }
    get jwtExpire():number {
        return parseInt(process.env.jwt_expire ?? JWT_EXPIRES);
    }
    get databaseReset():boolean {
        return process.env.database_reset === "true" ?? false;
    }
    get adminEmail():string {
        throwIfMissing("production", "adminEmail");
        return process.env.adminEmail ?? DEFAULTADMINEMAIL;
    }
    get adminPassword():string {
        throwIfMissing("production", "adminPassword");
        return process.env.adminPassword ?? DEFAULTADMINPASSWORD;
    }
}

export default new envconf();