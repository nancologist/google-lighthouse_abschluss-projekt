<template>
    <div>
        <v-stepper class="stepper" v-model="currentStep">
            <v-stepper-header class="stepper__header">
                <v-stepper-step color="secondaryDarker" :complete="currentStep > 1" step="1" editable>
                    <span>Select URL</span>
                </v-stepper-step>
                <v-divider/>

                <v-stepper-step color="secondaryDarker" :complete="currentStep > 2" step="2" editable>
                    Setup configuration
                </v-stepper-step>
                <v-divider/>

                <v-stepper-step color="secondaryDarker" step="3" editable>
                    Confirm setup
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-content class="stepper__content" step="1">
                <v-text-field
                    append-icon="mdi-web"
                    @focus="initUrlField"
                    @blur="resetUrlField"
                    filled
                    label="URL"
                    v-model.lazy="auditForm.url"
                />
                <v-select
                    filled
                    item-color="secondary"
                    label="Select report format"
                    v-model="auditForm.reportFormat"
                    :items="formats"
                />
            </v-stepper-content>

            <v-stepper-content class="stepper__content scrollbar" step="2">
                <div class="stepper__content__lh-configs">
                    <!-- Todo: Find a way to disable hover effect of switch button (it's very ugly!) -->
                    <v-switch v-model="auditForm.interactive" label="Interactive Mode"/>
                    <v-switch label="Use the preset configuration?" v-model="auditForm.isCustom"/>
                    <v-expansion-panels class="expansion-panels">
                        <TestConfig
                            v-for="configAudit in configAudits"
                            :key="configAudit.id"
                            :audit="configAudit"
                            @addAudit="addConfigAudit"
                        />
                    </v-expansion-panels>
                </div>
            </v-stepper-content>

            <v-stepper-content class="stepper__content" step="3">
                <div class="step-three">
                    <p>THE PREVIEW OF SET CONFIG WILL BE SHOWN HERE...</p>
                    <v-btn @click.prevent="runTest" :loading="loading" v-if="auditForm.interactive">
                        <v-icon color="secondaryDarker" left>mdi-test-tube</v-icon> Run Test
                    </v-btn>
                    <v-btn @click.prevent="runTest" v-else>
                        <v-icon color="secondaryDarker" left>mdi-text-box-multiple</v-icon> Export Report
                    </v-btn>
                </div>
            </v-stepper-content>
            <div class="stepper__buttons">
                <v-btn class="stepper__buttons__prev" @click="currentStep--" :disabled="currentStep <= 1">Back</v-btn>
                <v-btn class="stepper__buttons__next" @click="currentStep++" :disabled="currentStep >= 3">Next</v-btn>
            </div>
        </v-stepper>

        <v-bottom-sheet v-model="reportSheet" scrollable inset>
            <Report :audits="resultAudits"/>
        </v-bottom-sheet>
    </div>
</template>

<script>
import Report from './Report/Report.vue';
import TestConfig from './Configs/ConfigAudit.vue';
const { audits: configAudits } = require('../../data/data.json');
const { ipcRenderer } = require('electron');
export default {
    components: { Report, TestConfig },
    data() {
        return {
            auditForm: {
                isCustom: '',
                reportFormat: 'json',
                url: '',
                interactive: false,
                configs: {
                    audits: []
                }
            },
            resultAudits: {},
            configAudits,
            formats: [
                { text: 'HTML', value: 'html' },
                { text: 'JSON', value: 'json' }
            ],
            currentStep: 1,
            loading: false,
            reportSheet: false,
        };
    },
    methods: {
        runTest() {
            if (this.auditForm.interactive) this.loading = true;
            ipcRenderer.send('RUN_TEST', this.auditForm);
        },

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
            this.auditForm.configs.audits.push(newConfigAudit);
            // console.log(this.auditForm.configs.audits);
        }
    },
    created() {
        ipcRenderer.on('REPORT_CREATED', (event, res) => {
            this.loading = false;
            this.reportSheet = true;
            this.resultAudits = res;
        });
    }
};
</script>

<style scoped>
    @import "AuditForm.css";
</style>
