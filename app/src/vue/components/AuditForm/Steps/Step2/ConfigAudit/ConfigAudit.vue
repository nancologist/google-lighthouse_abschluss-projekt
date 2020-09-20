<template>
    <v-expansion-panel
        class="expansion-panels__panel config-panel"
    >
        <v-expansion-panel-header :disable-icon-rotate="added">
            <h3 ref="panel">{{ audit.title }}</h3>
            <template v-slot:actions v-if="added">
                <v-icon color="secondaryDark">mdi-check-bold</v-icon>
            </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <div class="config-panel__info">
                <p>
                    {{ audit.description.split(' [Learn more](')[0] }}
                    <a
                        @click="openLink(audit.description.split(' [Learn more](')[1])"
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
                    :disabled="inputDisabled"
                    label="Reference Time (sec)"
                    v-model="refTime"
                    outlined
                    type="number"
                />
                <v-btn
                    v-if="!added"
                    :disabled="!refTime"
                    class="mx-2 btn-fix"
                    fab
                    color="secondary"
                    @click="addConfig"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn
                    v-else
                    class="mx-2 btn-fix"
                    fab
                    color="error"
                    @click="removeConfig"
                >
                    <v-icon>mdi-minus</v-icon>
                </v-btn>
            </div>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
export default {
    data() {
        return {
            refTime: '',
            inputDisabled: false,
            added: false,
        };
    },
    props: ['audit'],
    methods: {
        openLink(text) {
            // Remove the extra ")." at the end of string
            const url = text.substring(0, text.length - 2);
            require('electron').shell.openExternal(url);
        },

        addConfig() {
            this.inputDisabled = true;
            this.added = true;
            this.$refs.panel.click();

            const newAudit = {
                id: this.audit.id,
                refTime: this.refTime * 1000
            };
            this.$emit('addAudit', newAudit);
        },

        removeConfig() {
            this.inputDisabled = false;
            this.refTime = '';
            this.added = false;
            this.$refs.panel.click();

            this.$emit('removeAudit', this.audit.id);
        }
    },
};
</script>

<style scoped>
    .expansion-panels__panel {
        margin: 3px;
        border-radius: 5px;
        box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.4);
    }

    .config-panel__info {
        text-align: left;
    }

    .config-panel__control {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
    }

    .config-panel__control__input {
        max-width: 50% !important;
    }
</style>
