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
                />
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
import TestMode from './Steps/Step1-TestMode.vue';
const { audits: configAudits } = require('../../data/data.json');
const { ipcRenderer } = require('electron');
export default {
    components: { Report, ConfigAudit, TestMode },
    data() {
        return {
            auditForm: {
                isCustom: false,
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
            configAudits,
            currentStep: 1,
            loading: false,
            sheetOpen: false,
            isPowertest: false,
            progress: 0,
        };
    },
    methods: {
        updateSitemapUrls(shouldAdd, url) {
            const arr = this.auditForm.urls.fromSitemap;
            const alreadyAdded = arr.includes(url);
            if (shouldAdd && !alreadyAdded) {
                arr.push(url);
            }
            if (!shouldAdd) {
                arr.splice(arr.indexOf(url), 1);
            }
        },

        runTest() {
            this.loading = true;
            ipcRenderer.send('RUN_TEST', this.auditForm);
        },

        addConfigAudit(newConfigAudit) {
            const alreadyAdded = this.auditForm.configs.audits
                .findIndex((configAudit) => configAudit.id === newConfigAudit.id) > -1;
            if (!alreadyAdded) this.auditForm.configs.audits.push(newConfigAudit);
        },

        removeConfigAudit(auditId) {
            this.auditForm.configs.audits = this.auditForm.configs.audits.filter((audit) => audit.id !== auditId);
        },
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
