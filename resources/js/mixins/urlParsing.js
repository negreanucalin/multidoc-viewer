import {mapState} from "vuex";
import {mapGetters} from "vuex";
let urlParsing = {

    methods: {
        parseEnvironment(url) {
            let environment = this.getEnvironmentByName(this.environment);
            return url.replace("{{environment}}", environment.url);
        }
    },
    computed: {
        ...mapState(['environment']),
        ...mapGetters(['getEnvironmentByName'])
    },
};
export { urlParsing };
