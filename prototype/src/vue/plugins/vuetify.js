import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// import colors from 'vuetify/lib/util/colors.js';

Vue.use(Vuetify);

const options = {
    theme: {
        // disable: true
        themes: {
            light: {
                primary: '#FEFFFF',
                primaryDark: '#17252A',
                secondary: '#3AAFA9'
                // accent: '#17252A'
                // error: '#ff0000'
            }
        }
    }
};

export default new Vuetify(options);
