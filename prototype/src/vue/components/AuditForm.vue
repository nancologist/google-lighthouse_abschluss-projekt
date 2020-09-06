<template>
    <div>
        <v-stepper class="stepper" v-model="currentStep">
            <v-stepper-header>
                <v-stepper-step :complete="currentStep > 1" step="1" editable>
                    Select URL
                </v-stepper-step>
                <v-divider/>

                <v-stepper-step :complete="currentStep > 2" step="2" editable>
                    Setup configuration
                </v-stepper-step>
                <v-divider/>

                <v-stepper-step step="3" editable>
                    Confirm setup
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-content step="1">
                <div class="stepper__content">
                    <v-text-field
                        @focus="initUrlField"
                        filled
                        label="Enter URL"
                        v-model.lazy="auditForm.url"
                    />
                    <v-select
                        label="Select report format"
                        v-model="auditForm.reportFormat"
                        :items="formats"
                    />
                </div>
                <div class="stepper__btn">
                    <v-btn class="stepper__content__btn-next" @click="currentStep = 2">Next Step</v-btn>
                </div>
            </v-stepper-content>

            <v-stepper-content class="stepper__content" step="2">
                <div class="stepper__content">
                    <!-- Todo: Find a way to disable hover effect of switch button (it's very ugly!) -->
                    <v-switch
                        :label="'Use custom configuration?'"
                        v-model="auditForm.isCustom"
                    />
                </div>
                <div class="stepper__btn">
                    <v-btn @click="currentStep = 1">Back</v-btn>
                    <v-btn @click="currentStep = 3">Next Step</v-btn>
                </div>
            </v-stepper-content>

            <v-stepper-content class="stepper__content" step="3">
                <div class="stepper__content">
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <div class="stepper__btn">
                    <v-btn @click="currentStep = 2">Back</v-btn>
                    <v-btn @click.prevent="testUrl">Run Test</v-btn>
                </div>
            </v-stepper-content>
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
            // console.log(this.auditForm);
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
        box-shadow: none;
        height: 100vh;
        padding: 10px;
    }

    .stepper__content {
        height: 60%;
    }
</style>
