<template>
    <v-row>
        <v-col>
            <v-text-field
                append-icon="mdi-paperclip"
                clearable
                @click="callFileInput"
                :disabled="testMode !== 'localSitemap'"
                label="Sitemap file"
                readonly
                v-model="sitemapPath"
            />
            <v-text-field
                append-icon="mdi-web"
                @blur="resetUrlField"
                @change="$emit('update:inputUrl', $event)"
                :disabled="testMode !== 'enterUrl'"
                @focus="initUrlField"
                label="URL"
                :rules="urlRules"
                validate-on-blur
                :value="inputUrl"
            />
            <input
                accept=".xml"
                @change="previewFile"
                hidden
                ref="fileInput"
                type="file"
            >
        </v-col>
        <v-divider vertical/>
        <v-col>
            <v-select
                outlined
                item-color="secondary"
                label="Select a test mode."
                v-model="testMode"
                :items="testModes"
            />
            <div>
                <Spinner v-if="analyseLoading"/>
                <div v-if="sitemapUrls.length > 0">
                    <v-checkbox
                        @change="$emit('updateSitemapUrls', selectedUrls)"
                        v-for="(url, index) in sitemapUrls"
                        :key="index"
                        :label="url.split('//')[1]"
                        v-model="selectedUrls"
                        :value="url"
                    />
                </div>
            </div>
        </v-col>
    </v-row>
</template>

<script>
import Spinner from '../../../UI/spinners/Spinner1.vue';
const { ipcRenderer } = require('electron');
export default {
    components: { Spinner },
    props: ['inputUrl'],
    data: () => ({
        selectedUrls: [],
        analyseLoading: false,
        sitemapUrls: [],
        sitemapPath: '',
        testMode: '',
        testModes: [
            { text: 'Local Sitemap', value: 'localSitemap' },
            { text: 'Remote Sitemap', value: 'remoteSitemap' },
            { text: 'Enter URL', value: 'enterUrl' }
        ],
        urlRules: [
            // eslint-disable-next-line
            (v) => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(v)
                || 'URL must be valid.' // eslint-disable-line
        ]
    }),
    methods: {
        initUrlField() {
            if (!this.inputUrl) {
                this.$emit('update:inputUrl', 'https://');
            }
        },

        resetUrlField() {
            if (this.inputUrl === 'https://') {
                this.$emit('update:inputUrl', '');
            }
        },

        callFileInput() {
            this.$refs.fileInput.click();
        },

        previewFile(event) {
            const { files } = event.target;
            if (files.length > 0) {
                this.sitemapPath = files[0].path;
                this.analyseLoading = true;
                ipcRenderer.send('ANALYSE_SITEMAP', this.sitemapPath);
            }
        },
    },
    created() {
        ipcRenderer.on('SITEMAP_ANALYSED', (event, urls) => {
            this.analyseLoading = false;
            this.sitemapUrls = urls;
            this.selectedUrls = urls;
        });
        ipcRenderer.on('ON_ERROR_XML', (event, err) => {
            this.analyseLoading = false;
            this.sitemapPath = '';
            this.$emit('xmlError', err);
        });
    },
    watch: {
        sitemapPath: function(val) {
            const inputCleared = (val === null);
            if (inputCleared) {
                this.sitemapUrls = '';
                this.selectedUrls = '';
            }
        }
    }
};
</script>
