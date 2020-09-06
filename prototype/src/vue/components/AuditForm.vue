<template>
    <div>
        <v-stepper class="stepper" v-model="currentStep">
            <v-stepper-header class="stepper__header">
                <v-stepper-step color="primaryDark" :complete="currentStep > 1" step="1" editable>
                    Select URL
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
                    @focus="initUrlField"
                    filled
                    label="Enter URL"
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
                <div class="stepper__content__lh-config">
                    <!-- Todo: Find a way to disable hover effect of switch button (it's very ugly!) -->
                    <v-switch
                        :label="'Use custom configuration?'"
                        v-model="auditForm.isCustom"
                    />
                </div>
            </v-stepper-content>

            <v-stepper-content class="stepper__content" step="3">
                <p>Lorem ipsum dolor sit amet.</p>
                <v-btn @click.prevent="testUrl">Run Test</v-btn>
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
                url: ''
            },
            formats: [
                { text: 'HTML', value: 'html' },
                { text: 'JSON', value: 'json' }
            ],
            currentStep: 1
        };
    },
    methods: {
        testUrl() {
            ipcRenderer.send('STORE_REPORT', this.auditForm);
        },
        initUrlField() {
            if (!this.auditForm.url) {
                this.auditForm.url = 'https://';
            }
        }
    }
};
</script>

<style scoped>
    .stepper {
        background-color: var(--third-color) !important;
        /*box-shadow: none;*/
        height: 100vh;
        padding: 10px 20px;
    }

    .stepper__header {
        border-radius: 5px;
    }

    .stepper__content {
        border-radius: 5px;
        /*box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);*/
        height: 600px;
        margin-top: 10px;
    }

    .stepper__content__lh-config {
        height: 550px;
        overflow: scroll;
    }

    .stepper__buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }
</style>
