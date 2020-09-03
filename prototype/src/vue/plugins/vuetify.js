import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// import colors from 'vuetify/lib/util/colors.js';

Vue.use(Vuetify);

const options = {
    theme: {
        // disable: true
        themes: {
            light: {
                primary: '#ff0000'
                // secondary: '#ff0000'
                // accent: '#ff0000'
                // error: '#ff0000'
            }
        }
    }
};

export default new Vuetify(options);
