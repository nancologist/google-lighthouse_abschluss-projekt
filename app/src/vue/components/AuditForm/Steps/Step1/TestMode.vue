<template>
    <v-container>
        <v-row>
            <v-col>
                <v-text-field
                    append-icon="mdi-paperclip"
                    clearable
                    @click="callFileInput"
                    @dragover.prevent
                    @drop="addDropFile"
                    label="Sitemap file (BROWSE or DRAG&DROP)"
                    readonly
                    v-cloak
                    v-model="sitemapName"
                />
                <v-text-field
                    append-icon="mdi-web"
                    @blur="resetUrlField"
                    @change="$emit('update:inputUrl', $event)"
                    clearable
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
                <v-icon large>mdi-information-outline</v-icon>
                <br>
                <p class="hint-box">{{ appHint }}</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div class="spinner">
                    <Spinner v-if="analyseLoading"/>
                </div>
                <div
                    v-if="sitemapUrls.length > 0"
                    class="sitemap-urls"
                >
                    <div
                        class="sitemap-urls__header"
                    >
                        <strong>{{ mainUrl }}</strong>
                        <v-checkbox
                            @change="toggleSelectAll"
                            label="all"
                        />
                    </div>
                    <v-checkbox
                        @change="$emit('updateSitemapUrls', selectedUrls)"
                        class="url-checkbox"
                        v-for="(url, index) in sitemapUrls"
                        :key="index"
                        :label="url.split('.com')[1]||url.split('.de')[1]"
                        v-model="selectedUrls"
                        :value="url"
                    />
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Spinner from '../../../UI/spinners/Spinner1.vue';
const { ipcRenderer } = require('electron');
export default {
    components: { Spinner },
    props: ['inputUrl', 'dropEvent'],
    data: () => ({
        appHint: 'Enter URL and/or use a sitemap.',
        selectedUrls: [],
        analyseLoading: false,
        sitemapUrls: [],
        sitemapPath: '',
        sitemapName: '',
        selectAllCheckbox: null,
        mainUrl: '',
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

        previewSitemapFile(event, dragMode = false) {
            let files;
            if (dragMode) {
                files = event.dataTransfer.files;
            } else {
                files = event.target.files;
            }
            if (files.length > 0) {
                this.sitemapName = files[0].name;
                this.sitemapPath = files[0].path;
                this.analyseLoading = true;
                ipcRenderer.send('ANALYSE_SITEMAP_FILE', this.sitemapPath);
            }
        },

        previewSitemapUrl() {
            this.analyseLoading = true;
            ipcRenderer.send('ANALYSE_SITEMAP_URL', this.inputUrl);
        },

        toggleSelectAll(checked) {
            if (checked) {
                this.selectedUrls = [...this.sitemapUrls];
            } else {
                this.selectedUrls = [];
            }
            this.$emit('updateSitemapUrls', this.selectedUrls);
        },

        addDropFile(event) {
            const { name, path } = event.dataTransfer.files[0];
            this.sitemapName = name;
            this.sitemapPath = path;
            ipcRenderer.send('ANALYSE_SITEMAP_FILE', this.sitemapPath);
        }
    },
    created() {
        ipcRenderer.on('SITEMAP_ANALYSED', (event, urls) => {
            this.analyseLoading = false;
            this.sitemapUrls = urls;
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
        // Clear Sitemap File (Click on X)
        sitemapName: function(val) {
            const inputCleared = (val === null);
            if (inputCleared) {
                this.sitemapUrls = [];
                this.selectedUrls = [];
                this.$refs.fileInput.value = null;
                this.appHint = 'Enter URL and/or use a sitemap.';
            }
        },
        inputUrl: function(val) {
            const urlCleared = (val === null);
            if (urlCleared && (this.sitemapPath === '' || this.sitemapPath === null)) {
                this.sitemapUrls = [];
                this.selectedUrls = [];
                this.appHint = 'Enter URL and/or use a sitemap.';
            }
        },
        sitemapUrls: function(val) {
            if (val.length > 0) {
                this.mainUrl = val[0].split('/')[2];
            }
        },
        dropEvent: function(val) {
            if (val) {
                this.previewSitemapFile(val, true);
            }
        }
    },
};
</script>

<style scoped>
    .preview-btn {
        display: block;
        margin-top: 20px;
    }

    .hint-box {
        color: #333;
        overflow: scroll;
        /*
            For Long words and URLs.
            These are technically the same, but use both:
        */
        overflow-wrap: break-word;
        word-wrap: break-word;
    }

    .spinner {
        transform: scale(0.6);
        position: relative;
        bottom: 150px;
    }

    .sitemap-urls {
        background-color: rgba(0, 0, 0, 0.15);
        border-radius: 5px;
        padding: 5px 25px;
    }

    .sitemap-urls__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .url-checkbox {
        padding: 0;
        margin: 0;
    }
</style>
