import * as dotenv from 'dotenv';

dotenv.config();

const config = {
    instaAccount: {
        username: process.env.IG_USERNAME,
        password: process.env.IG_PASSWORD,
    }
};

export interface InstaAccountConfig {
    username: string;
    password: string;
}

export default config;
