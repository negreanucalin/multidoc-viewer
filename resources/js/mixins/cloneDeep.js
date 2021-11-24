
let cloneDeep = {
    methods: {
        cloneDeep(object)
        {
            return JSON.parse(JSON.stringify(object));
        }
    }
};
export { cloneDeep };