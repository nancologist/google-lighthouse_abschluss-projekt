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
                secondary: '#3AAFA9',
                secondaryDark: '#2B7A78',
                secondaryDarker: '#17252A',
                error: '#AF3A40', // Complementary of #3AAFA9
                danger: '#AF3A40', // Complementary of #3AAFA9
                warning: '#AF6F3A',
                // accent: '#17252A'
                // error: '#ff0000'
            }
        }
    }
};

export default new Vuetify(options);
