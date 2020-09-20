<template>
    <v-row>
        <v-col>
            <v-text-field
                append-icon="mdi-paperclip"
                clearable
                @click="callFileInput"
                label="Sitemap file"
                readonly
                v-model="sitemapPath"
            />
            <v-text-field
                append-icon="mdi-web"
                @blur="resetUrlField"
                @change="$emit('update:inputUrl', $event)"
                @focus="initUrlField"
                label="URL"
                :rules="urlRules"
                validate-on-blur
                :value="inputUrl"
            />
            <input
                accept=".xml"
                @change="previewSitemapFile"
                hidden
                ref="fileInput"
                type="file"
            >
            <v-btn
                class="preview-btn"
                @click="previewSitemapUrl"
                elevation="3"
            >
                Preview
            </v-btn>
        </v-col>
        <v-divider vertical/>
        <v-col cols="4">
            <p style="text-align: left; color: #333">{{ appHint }}</p>
            <div>
                <Spinner v-if="analyseLoading"/>
                <div
                    v-if="sitemapUrls.length > 0"
                    :class="{'full-width': sitemapUrls.length > 6}"
                >
                    <v-checkbox
                        @change="$emit('updateSitemapUrls', selectedUrls)"
                        v-for="(url, index) in sitemapUrls"
                        :key="index"
                        :label="url.split('.com')[1]||url.split('.de')[1]"
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
        appHint: 'Enter URL and/or use a sitemap.',
        selectedUrls: [],
        analyseLoading: false,
        sitemapUrls: [],
        sitemapPath: '',
        urlRules: [
            // eslint-disable-next-line
            (v) => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(v)
                || 'URL must be valid.' // eslint-disable-line
        ]
    }),
    methods: {
        initUrlField() {
            this.appHint = 'You can either enter a URL of a Website to test or a URL of a remote sitemap. ' +
                'For a remote sitemap, after entering URL (e.g. https://www.digitaspixelpark.com/sitemap.xml), please click on "PREVIEW".';
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

        previewSitemapFile(event) {
            const { files } = event.target;
            if (files.length > 0) {
                this.sitemapPath = files[0].path;
                this.analyseLoading = true;
                ipcRenderer.send('ANALYSE_SITEMAP_FILE', this.sitemapPath);
            }
        },

        previewSitemapUrl() {
            this.analyseLoading = true;
            ipcRenderer.send('ANALYSE_SITEMAP_URL', this.inputUrl);
        }
    },
    created() {
        ipcRenderer.on('SITEMAP_ANALYSED', (event, urls) => {
            this.analyseLoading = false;
            this.sitemapUrls = urls;
            // Preselect Routes only if they are less than 6:
            if (urls.length < 6) this.selectedUrls = urls;
            this.appHint = 'Include or exclude routes';
            this.$emit('updateSitemapUrls', this.selectedUrls);
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
                this.appHint = 'Enter URL and/or use a sitemap.';
            }
        }
    }
};
</script>

<style scoped>
    .preview-btn {
        display: block;
        margin-top: 20px;
    }

    .full-width {
        width: 100vw;
    }
</style>
