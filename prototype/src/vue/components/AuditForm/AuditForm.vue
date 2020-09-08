<template>
    <div>
        <v-stepper class="stepper" v-model="currentStep">
            <v-stepper-header class="stepper__header">
                <v-stepper-step color="primaryDark" :complete="currentStep > 1" step="1" editable>
                    <span>Select URL</span>
                </v-stepper-step>
                <v-divider/>

                <v-stepper-step color="primaryDark" :complete="currentStep > 2" step="2" editable>
                    Setup configuration
                </v-stepper-step>
                <v-divider/>

                <v-stepper-step color="primaryDark" step="3" editable>
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

            <v-stepper-content class="stepper__content" step="2">
                <div class="stepper__content__lh-configs">
                    <!-- Todo: Find a way to disable hover effect of switch button (it's very ugly!) -->
                    <v-switch
                        label="Use the preset configuration?"
                        v-model="auditForm.isCustom"
                    />
                    <div class="my-config">
                        <v-expansion-panels>
                            <div class="config-panels">
                                <v-expansion-panel class="config-panels__item">
                                    <v-expansion-panel-header>
                                        <h3>First Meaningful Paint</h3>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <div class="config-panel__info">
                                            <p>
                                                First Meaningful Paint measures when the primary content of a page is visible.
                                                <a
                                                    @click="openLink('https://web.dev/first-meaningful-paint/')"
                                                    class="link"
                                                >
                                                    [Learn more]
                                                </a>
                                            </p>
                                        </div>
                                        <div class="config-panel__control">
                                            <v-text-field
                                                append-icon="mdi-timer-outline"
                                                class="config-panel__control__input"
                                                color="secondary"
                                                label="Reference Time (ms)"
                                                outlined
                                                v-model="auditForm.refTime"
                                            />
                                            <v-btn :disabled="!auditForm.refTime" class="mx-2" fab color="secondary">
                                                <v-icon>mdi-plus</v-icon>
                                            </v-btn>
                                        </div>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel class="config-panels__item">
                                    <v-expansion-panel-header>
                                        <h3>I am a dummy expansion panel!</h3>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, ullam.</p>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel class="config-panels__item">
                                    <v-expansion-panel-header>
                                        <h3>I am a dummy expansion panel!</h3>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, ullam.</p>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </div>
                        </v-expansion-panels>
                    </div>
                </div>
            </v-stepper-content>

            <v-stepper-content class="stepper__content" step="3">
                <div class="step-three">
                    <p>The preview of set config comes HERE...</p>
                    <v-btn @click.prevent="runInteractiveTest">
                        Run Test
                    </v-btn>
                    <v-btn @click.prevent="createReport">
                        <v-icon left>mdi-text-box-multiple</v-icon> Export Report
                    </v-btn>
                </div>
            </v-stepper-content>
            <div class="stepper__buttons">
                <v-btn @click="currentStep--" :disabled="currentStep <= 1">Back</v-btn>
                <v-btn @click="currentStep++" :disabled="currentStep >= 3">Next</v-btn>
            </div>
        </v-stepper>
    </div>
</template>

<script>
const { ipcRenderer } = require('electron');
export default {
    data() {
        return {
            auditForm: {
                isCustom: '',
                reportFormat: '',
                url: '',
                refTime: ''
            },
            formats: [
                { text: 'HTML', value: 'html' },
                { text: 'JSON', value: 'json' }
            ],
            currentStep: 1
        };
    },
    methods: {
        createReport() {
            ipcRenderer.send('CREATE_REPORT', this.auditForm);
        },

        runInteractiveTest() {},

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

        openLink(url) {
            require('electron').shell.openExternal(url);
        }
    }
};
</script>

<style scoped>
    @import "AuditForm.css";
</style>
