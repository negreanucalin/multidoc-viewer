import colorMap from "../config/colors";

let methodColor = {
    methods: {
        getColorByMethod(text) {
            return colorMap[text];
        }
    }
};
export { methodColor };
