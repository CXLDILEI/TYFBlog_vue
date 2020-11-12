const config = {
    get(key:string): string | undefined {
        return process.env[`VUE_APP_${key}`];
    },
};

export default config;
