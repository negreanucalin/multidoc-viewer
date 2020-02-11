let methodColor = {
    methods: {
        getColorByMethod(text) {
            let colorMap = {'GET': 'primary', 'POST': 'green', 'DELETE': 'red', 'PATCH': 'orange', 'OPTIONS': ''}
            return colorMap[text];
        }
    }
};
export { methodColor };
