<template>
    <v-row>
        <v-col>
            <div class="input-file-container">
                <v-text-field
                    append-icon="mdi-paperclip"
                    @click="callFileInput"
                    :disabled="testMode !== 'localSitemap'"
                    label="Sitemap file"
                    readonly
                    v-model="sitemapPath"
                />
                <v-icon
                    class="clean-btn"
                    color="white"
                    @click="cleanSitemapPath"
                    v-if="sitemapPath"
                >
                    mdi-delete
                </v-icon>
            </div>
            <v-text-field
                append-icon="mdi-web"
                @blur="resetUrlField"
                :disabled="testMode !== 'enterUrl'"
                @focus="initUrlField"
                label="URL"
                :value="inputUrl"
                @change="$emit('update:inputUrl', $event)"
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
                        @change="$emit('updateSitemapUrls', urls)"
                        v-for="(url, index) in sitemapUrls"
                        :key="index"
                        :label="url.split('//')[1]"
                        v-model="urls"
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
        urls: [],
        analyseLoading: false,
        sitemapUrls: [],
        sitemapPath: '',
        testMode: '',
        testModes: [
            { text: 'Local Sitemap', value: 'localSitemap' },
            { text: 'Remote Sitemap', value: 'remoteSitemap' },
            { text: 'Enter URL', value: 'enterUrl' }
        ],
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

        cleanSitemapPath() {
            this.sitemapPath = '';
        }
    },
    created() {
        ipcRenderer.on('SITEMAP_ANALYSED', (event, urls) => {
            this.analyseLoading = false;
            this.sitemapUrls = urls;
            this.urls = urls;
        });
    }
};
</script>

<style scoped>
.input-file-container {
    position: relative;
}

.clean-btn {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 15px;
}
</style>
