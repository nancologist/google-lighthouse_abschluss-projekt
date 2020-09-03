import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors.js';

Vue.use(Vuetify);

const options = {
    theme: {
        themes: {
            light: {
                primary: colors.purple,
                secondary: colors.grey.darken1,
                accent: colors.shades.black,
                error: colors.red.accent3
            }
        }
    }
};

export default new Vuetify(options);
