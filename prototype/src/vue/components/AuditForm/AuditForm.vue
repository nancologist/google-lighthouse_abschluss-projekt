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
                    <v-btn @click.prevent="runTest" :loading="loading" v-if="auditForm.interactive">
                        <v-icon color="secondaryDarker" left>mdi-test-tube</v-icon> Run Test
                    </v-btn>
                    <v-btn @click.prevent="runTest" v-else>
                        <v-icon color="secondaryDarker" left>mdi-text-box-multiple</v-icon> Export Report
                    </v-btn>
                    <v-btn @click="runPowertest" style="color: var(--danger)">
                        <v-icon color="error" left>mdi-radioactive</v-icon> POWER-TEST
                    </v-btn>
                </div>
            </v-stepper-content>
            <div class="stepper__buttons">
                <v-btn class="stepper__buttons__prev" @click="currentStep--" :disabled="currentStep <= 1">Back</v-btn>
                <v-btn class="stepper__buttons__next" @click="currentStep++" :disabled="currentStep >= 3">Next</v-btn>
            </div>
        </v-stepper>

        <v-bottom-sheet v-model="reportSheetOpen" scrollable inset>
            <Report v-if="isPowertest" :reports="resultReports" />
            <Report v-else :audits="resultAudits"/>
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
                reportFormat: 'json',
                url: '',
                interactive: true,
                configs: {
                    audits: []
                }
            },
            resultAudits: {},
            resultReports: [],
            configAudits,
            formats: [
                { text: 'HTML', value: 'html' },
                { text: 'JSON', value: 'json' }
            ],
            currentStep: 1,
            loading: false,
            reportSheetOpen: false,
            isPowertest: false,
        };
    },
    methods: {
        runTest() {
            if (this.auditForm.interactive) this.loading = true;
            ipcRenderer.send('RUN_TEST', this.auditForm);
        },

        runPowertest() {
            ipcRenderer.send('RUN_POWERTEST', this.auditForm);
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
            const alreadyAdded = this.auditForm.configs.audits
                .findIndex((configAudit) => configAudit.id === newConfigAudit.id) > -1;
            if (!alreadyAdded) this.auditForm.configs.audits.push(newConfigAudit);
        },

        removeConfigAudit(auditId) {
            this.auditForm.configs.audits = this.auditForm.configs.audits.filter((audit) => audit.id !== auditId);
        }
    },
    created() {
        ipcRenderer.on('REPORT_CREATED', (event, res) => {
            this.loading = false;
            this.isPowertest = Array.isArray(res);
            if (this.isPowertest) {
                this.resultReports = res;
            } else {
                this.resultAudits = res;
            }
            this.reportSheetOpen = true;
        });
    }
};
</script>

<style scoped>
    @import "AuditForm.css";
</style>
