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
                <div class="stepper__content__lh-configs">
                    <!-- Todo: Find a way to disable hover effect of switch button (it's very ugly!) -->
                    <v-switch
                        :label="'Use custom configuration?'"
                        v-model="auditForm.isCustom"
                    />
                    <div class="stepper__content__lh-configs__config">
                        <div style="display: none" class="config-card">
                            <p class="config-card__title">First Meaningful Paint</p>
                            <div class="config-card__info">
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
                            <div class="config-card__control">
                                <v-text-field
                                    color="secondary"
                                    label="Set reference duration"
                                    filled
                                >
                                </v-text-field>
                                <v-btn class="mx-2" fab color="secondary">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </div>
                        </div>
                        <v-expansion-panels>
                            <div class="config-panels">
                                <v-expansion-panel class="config-panels__item">
                                    <v-expansion-panel-header>
                                        First Meaningful Paint
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <div class="config-panel__info">
                                            <small>
                                                First Meaningful Paint measures when the primary content of a page is visible.
                                                <a
                                                    @click="openLink('https://web.dev/first-meaningful-paint/')"
                                                    class="link"
                                                >
                                                    [Learn more]
                                                </a>
                                            </small>
                                        </div>
                                        <div class="panels__panel__content">
                                            <div class="panels__panel__content__controls">
                                                <v-text-field
                                                    color="secondary"
                                                    label="Set acceptable duration"
                                                    filled
                                                >
                                                </v-text-field>
                                                <v-btn class="mx-2" fab color="secondary">
                                                    <v-icon>mdi-plus</v-icon>
                                                </v-btn>
                                            </div>
                                        </div>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel class="config-panels__item">
                                    <v-expansion-panel-header>
                                        I am a dummy expansion panel!
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, ullam.</p>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel class="config-panels__item">
                                    <v-expansion-panel-header>
                                        I am a dummy expansion panel!
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
        },
        openLink(url) {
            require('electron').shell.openExternal(url);
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
        height: 400px;
        margin-top: 10px;
    }

    .stepper__content__lh-configs {
        /*height: 550px;*/
    }

    .stepper__buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }

    .link {
        color: var(--third-color);
    }

    /*.config-card {*/
    /*    display: none;*/
    /*    background-color: var(--fourth-color);*/
    /*    border-radius: 5px;*/
    /*    box-shodaw: 0 1px 2px 1px black;*/
    /*    padding: 15px;*/
    /*}*/

    .config-panels {
        width: 98%;
        display: flex;
        flex-wrap: wrap;
    }

    .config-panels__item {
        /*max-width: 48%;*/
        margin: 5px;
        border-radius: 5px;
        box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.4);
    }

    .config-panel__info {
        text-align: left;
    }
</style>
