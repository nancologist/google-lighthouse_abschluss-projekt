<template>
    <div>
        <v-stepper class="stepper" v-model="currentStep">
            <v-stepper-header class="stepper__header">
                <v-stepper-step color="secondaryDarker" :complete="currentStep > 1" step="1" editable>
                    <span>Test Mode</span>
                </v-stepper-step>
                <v-divider/>

                <v-stepper-step color="secondaryDarker" :complete="currentStep > 2" step="2" editable>
                    Configuration
                </v-stepper-step>
                <v-divider/>

                <v-stepper-step color="secondaryDarker" step="3" editable>
                    Preview & Run
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-content class="stepper__content" step="1">
                <TestMode
                    :inputUrl.sync="auditForm.urls.fromInput"
                    @updateSitemapUrls="updateSitemapUrls"
                    @xmlError="renderXmlError"
                />
            </v-stepper-content>

            <v-stepper-content class="stepper__content scrollbar" step="2">
                <Configs
                    @addAudit="addConfigAudit"
                    @removeAudit="removeConfigAudit"
                />
            </v-stepper-content>

            <v-stepper-content class="stepper__content" step="3">
                <div class="step-three">
                    <p>THE PREVIEW OF SET CONFIG WILL BE SHOWN HERE...</p>
                    <v-btn
                        @click.prevent="runTest"
                        :loading="loading"
                    >
                        <v-icon color="secondaryDarker" left>mdi-test-tube</v-icon> Run Test
                    </v-btn>
                    <v-progress-linear
                        :active="loading"
                        background-color="primary"
                        color="secondaryDark"
                        height="10"
                        rounded
                        v-model="progress"
                        style="margin: 10px auto 0 auto; width: 70%;"
                    />
                    <v-tooltip left>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                @click="sheetOpen = true"
                                class="step-three__open-report-btn"
                                color="secondaryDarker"
                                depressed
                                :disabled="loading || !testResult"
                                fab
                                small
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon color="white" small>mdi-newspaper-variant-outline</v-icon>
                            </v-btn>
                        </template>
                        <span>Open test report</span>
                    </v-tooltip>
                </div>
            </v-stepper-content>

            <div class="stepper__buttons">
                <v-btn class="stepper__buttons__prev" @click="currentStep--" :disabled="currentStep <= 1">
                    <v-icon color="secondaryDarker" left>mdi-chevron-left</v-icon> Back
                </v-btn>
                <v-btn class="stepper__buttons__next" @click="currentStep++" :disabled="currentStep >= 3">
                    Next <v-icon color="secondaryDarker" right>mdi-chevron-right</v-icon>
                </v-btn>
            </div>
        </v-stepper>

        <v-bottom-sheet v-model="sheetOpen" scrollable persistent>
            <Report :isPowertest="isPowertest" :reports="testResult" @close="sheetOpen = false" />
        </v-bottom-sheet>
        <Error :showDialog.sync="hasError" :error="error"/>
    </div>
</template>

<script>
import Report from './Report/Report.vue';
import TestMode from './Steps/Step1/TestMode.vue';
import Configs from './Steps/Step2/Configs.vue';
import Error from '../Error/Error.vue';
const { ipcRenderer } = require('electron');
export default {
    components: { Report, TestMode, Configs, Error },
    data() {
        return {
            auditForm: {
                urls: {
                    fromInput: '',
                    fromSitemap: []
                },
                sitemapPath: '',
                configs: {
                    audits: []
                }
            },
            testResult: null,
            currentStep: 1,
            loading: false,
            sheetOpen: false,
            isPowertest: false,
            progress: 0,
            hasError: false,
            error: {}
        };
    },
    methods: {
        updateSitemapUrls(urls) {
            this.auditForm.urls.fromSitemap = urls;
        },

        addConfigAudit(newConfigAudit) {
            const arr = this.auditForm.configs.audits;
            const alreadyAdded = arr.findIndex((configAudit) => configAudit.id === newConfigAudit.id) > -1;
            if (!alreadyAdded) {
                arr.push(newConfigAudit);
            }
        },

        removeConfigAudit(auditId) {
            this.auditForm.configs.audits = this.auditForm.configs.audits
                .filter((audit) => audit.id !== auditId);
        },

        runTest() {
            this.loading = true;
            const inputUrl = this.auditForm.urls.fromInput;
            const sitemapUrls = this.auditForm.urls.fromSitemap;
            let urls = [...sitemapUrls];
            if (inputUrl) urls = [inputUrl, ...urls];
            ipcRenderer.send('RUN_TEST', this.auditForm, urls);
        },

        renderXmlError({ title, message }) {
            this.hasError = true;
            this.error = {
                title,
                msg: message
            };
        }
    },
    created() {
        ipcRenderer.on('REPORT_CREATED', (event, res) => {
            // Reset states:
            this.loading = false;
            this.powertestLoading = false;
            setTimeout(() => { this.progress = 0; }, 500);

            this.testResult = res;
            this.isPowertest = Array.isArray(res);
            this.sheetOpen = true;
        });

        ipcRenderer.on('PROGRESS', (event, progress) => {
            this.progress += 100 * progress;
        });

        ipcRenderer.on('ON_ERROR', (event, err) => {
            this.hasError = true;
            this.loading = false;
            if (err.code === 'INVALID_URL') {
            // Example: ajfklöafjieworw
                err.title = 'Invalid URL';
            }
            if (err.code === 'DNS_FAILURE') {
            // Example: http://www.ksljfjklsjlkf.com/
                err.title = 'DNS Failure';
            }
            const { title, details } = err;

            this.error = {
                title,
                msg: err.friendlyMessage || err.message,
                details
            };
        });
    }
};
</script>

<style scoped>
    @import "AuditForm.css";
</style>
