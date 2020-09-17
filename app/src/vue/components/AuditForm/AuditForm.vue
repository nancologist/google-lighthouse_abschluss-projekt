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
                    Preview
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-content class="stepper__content" step="1">
                <v-row>
                    <v-col>
                        <v-text-field
                            append-icon="mdi-web"
                            @blur="resetUrlField"
                            :disabled="testMode !== 'enterUrl'"
                            @focus="initUrlField"
                            label="URL"
                            v-model.lazy="auditForm.url"
                        />
                        <v-text-field
                            append-icon="mdi-paperclip"
                            @click="callFileInput"
                            :disabled="testMode !== 'localSitemap'"
                            label="Sitemap file"
                            readonly
                            v-model="auditForm.sitemapPath"
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
                    <v-col align-self="center">
                        <v-select
                            @change="handleTestModeChange"
                            outlined
                            item-color="secondary"
                            label="Select the test mode."
                            v-model="testMode"
                            :items="testModes"
                        />
                    </v-col>
                </v-row>
            </v-stepper-content>

            <v-stepper-content class="stepper__content scrollbar" step="2">
                <div class="stepper__content__lh-configs">
                    <v-switch label="Custom Configs" v-model="auditForm.isCustom"/>
                    <v-expansion-panels class="expansion-panels" :disabled="!auditForm.isCustom">
                        <ConfigAudit
                            v-for="configAudit in configAudits"
                            :key="configAudit.id"
                            :audit="configAudit"
                            @addAudit="addConfigAudit"
                            @removeAudit="removeConfigAudit"
                        />
                    </v-expansion-panels>
                </div>
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
                    <!--<v-btn
                        @click="runPowertest"
                        style="color: var(--danger)"
                        :loading="powertestLoading"
                        :disabled="loading"
                    >
                        <v-icon color="error" left>mdi-radioactive</v-icon> POWER-TEST
                    </v-btn>-->
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
    </div>
</template>

<script>
import Report from './Report/Report.vue';
import ConfigAudit from './Configs/ConfigAudit.vue';
const { audits: configAudits } = require('../../data/data.json');
const { ipcRenderer } = require('electron');
export default {
    components: { Report, ConfigAudit },
    data() {
        return {
            auditForm: {
                isCustom: false,
                url: '',
                sitemapPath: '',
                configs: {
                    audits: []
                }
            },
            testMode: '',
            testModes: [
                { text: 'Local Sitemap', value: 'localSitemap' },
                { text: 'Remote Sitemap', value: 'remoteSitemap' },
                { text: 'Enter URL', value: 'enterUrl' }
            ],
            testResult: null,
            configAudits,
            currentStep: 1,
            loading: false,
            // powertestLoading: false,
            sheetOpen: false,
            isPowertest: false,
            progress: 0,
        };
    },
    methods: {
        runTest() {
            this.loading = true;
            if (this.auditForm.sitemapPath) {
                ipcRenderer.send('RUN_POWERTEST', this.auditForm);
            } else {
                ipcRenderer.send('RUN_TEST', this.auditForm);
            }
        },

        // runPowertest() {
        //     this.powertestLoading = true;
        //     ipcRenderer.send('RUN_POWERTEST', this.auditForm);
        // },

        initUrlField() {
            if (!this.auditForm.url) {
                this.auditForm.url = 'https://';
            }
        },

        resetUrlField() {
            if (this.auditForm.url === 'https://') {
                this.auditForm.url = '';
            }
        },

        addConfigAudit(newConfigAudit) {
            const alreadyAdded = this.auditForm.configs.audits
                .findIndex((configAudit) => configAudit.id === newConfigAudit.id) > -1;
            if (!alreadyAdded) this.auditForm.configs.audits.push(newConfigAudit);
        },

        removeConfigAudit(auditId) {
            this.auditForm.configs.audits = this.auditForm.configs.audits.filter((audit) => audit.id !== auditId);
        },

        callFileInput() {
            this.$refs.fileInput.click();
        },

        previewFile(event) {
            const { files } = event.target;
            if (files.length > 0) {
                this.auditForm.sitemapPath = files[0].path;
            }
        },

        handleTestModeChange(eventVal) {
            if (eventVal === 'enterUrl') {
                this.auditForm.url = '';
            }
            if (eventVal !== 'localSitemap') {
                this.auditForm.sitemapPath = '';
            }
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
    }
};
</script>

<style scoped>
    @import "AuditForm.css";
</style>
