<template>
    <div
        class="audit-form"
        @dragenter.prevent="handleDragEnter"
        @dragleave.prevent="handleDragLeave"
        @dragover.prevent
        @drop="handleDrop"
    >
        <v-stepper
            class="stepper"
            :class="{'drag-mode': dragMode}"
            v-model="steps.currentStep"
        >
            <span class="drag-mode__msg" v-if="dragMode">Drop sitemap file!</span>
            <v-stepper-header class="stepper__header">
                <!-- eslint-disable  vue/valid-v-for -->
                <template
                    v-for="(stepName, index) in steps.labels"
                >
                    <v-stepper-step
                        color="secondaryDarker"
                        :complete="steps.currentStep > index + 1"
                        editable
                        :step="index + 1"
                    >{{ stepName }}</v-stepper-step>
                    <v-divider v-if="index < steps.labels.length - 1"/>
                </template>
            </v-stepper-header>

            <v-stepper-content class="stepper__content" step="1">
                <TestMode
                    :inputUrl.sync="auditForm.urls.fromInput"
                    :dropEvent="dropEvent"
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
                    <p>The test could take couple of minutes for large amount of URLs.</p>
                    <v-btn
                        @click.prevent="runTest"
                        :loading="loading"
                    >
                        <v-icon color="secondaryDarker" left>mdi-test-tube</v-icon> Run Test
                    </v-btn>
                    <div class="progress-bar">
                        <v-progress-linear
                            :active="loading"
                            background-color="primary"
                            color="secondaryDark"
                            height="10"
                            rounded
                            v-model="progress"
                            style="margin: 10px auto 0 auto; width: 70%;"
                        />
                        <span v-if="loading" class="white--text">{{ progress }} %</span>
                    </div>
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
                <v-btn class="stepper__buttons__prev" @click="steps.currentStep--" :disabled="steps.currentStep <= 1">
                    <v-icon color="secondaryDarker" left>mdi-chevron-left</v-icon> Back
                </v-btn>
                <v-btn class="stepper__buttons__next" @click="steps.currentStep++" :disabled="steps.currentStep >= 3">
                    Next <v-icon color="secondaryDarker" right>mdi-chevron-right</v-icon>
                </v-btn>
            </div>
        </v-stepper>
        <v-bottom-sheet v-model="sheetOpen" scrollable persistent>
            <Report :reports="testResult" @close="sheetOpen = false" />
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
            steps: {
                labels: ['Test Mode', 'Configuration', 'Preview & Test'],
                currentStep: 1,
            },
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
            loading: false,
            sheetOpen: false,
            progress: 0,
            hasError: false,
            error: {},
            dragMode: false,
            dragCount: 0,
            dropEvent: null,
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
            // Only if input URL is not empty or sitemap it's testable.
            if (inputUrl &&
                !inputUrl.includes('sitemap') &&
                !inputUrl.includes('xml')
            ) {
                urls = [inputUrl, ...urls];
            }
            ipcRenderer.send('RUN_TEST', this.auditForm, urls);
        },

        renderXmlError({ title, message }) {
            this.hasError = true;
            this.error = {
                title,
                msg: message
            };
        },

        handleDragEnter(event) {
            const isFirstStep = (this.steps.currentStep === 1);
            if (isFirstStep) {
                this.dragCount++;
                if (this.dragCount > 0) {
                    this.dragMode = true;
                }
            }
        },

        handleDragLeave(event) {
            const isFirstStep = (this.steps.currentStep === 1);
            if (isFirstStep) {
                this.dragCount--;
                if (this.dragCount === 0) {
                    this.dragMode = false;
                }
            }
        },

        handleDrop(event) {
            const fileExtension = event.dataTransfer
                .files[0].name.split('.')[1].toLowerCase();
            if (fileExtension === 'xml') {
                this.dropEvent = event;
            } else {
                this.hasError = true;
                this.error = {
                    title: 'File Type',
                    msg: 'Wrong file type. Only xml files are allowed.'
                };
            }
            this.dragCount = 0;
            this.dragMode = false;
        }
    },
    created() {
        ipcRenderer.on('REPORT_CREATED', (event, res) => {
            // Reset states slightly after receiving test report:
            setTimeout(() => {
                this.loading = false;
                setTimeout(() => { this.progress = 0; }, 200);
            }, 500);

            // Append user refTime to the result of its audit:
            res = JSON.parse(JSON.stringify(res));
            const isCustomConfig = this.auditForm.configs.audits.length > 0;
            if (isCustomConfig) {
                res.forEach((test) => {
                    for (const prop in test) {
                        if (test[prop].id) {
                            const audit = this.auditForm.configs.audits.find((a) => a.id === test[prop].id);
                            test[prop].refTime = audit.refTime;
                        }
                    }
                });
            }

            this.testResult = res;
            this.sheetOpen = true;
        });

        ipcRenderer.on('PROGRESS', (event, progress) => {
            this.progress += Math.ceil(100 * progress);
            if (this.progress > 100) this.progress = 100;
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

    .drag-mode:after {
        background-color: rgba(0,0,0,0.75);
        content: '';
        color: white;
        pointer-events: none;
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
    }

    .drag-mode__msg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 20px;
        padding: 200px 200px;
        border-radius: 5px;
        color: #bbb;
        z-index: 10;
        border: 2px dashed #bbb;
    }
</style>
