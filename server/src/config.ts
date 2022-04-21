
const SALTROUNDS = "13"
const MONGO_URI = "mongodb://localhost:27017/test"


class conf{
    get MongoDB():string {    
        if (process.env.node_env === "production" && !process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in enviroment");
        }
        return process.env.MONGO_URI ?? MONGO_URI;
    }
    get SaltRounds():number {
        return parseInt(process.env.salt_rounds ?? SALTROUNDS);
    }

}

export default new conf();