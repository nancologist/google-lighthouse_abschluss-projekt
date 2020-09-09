<template>
    <v-expansion-panel
        class="expansion-panels__panel"
    >
        <v-expansion-panel-header>
            <h3>{{ audit.title }}</h3>
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
                    label="Reference Time (ms)"
                    outlined
                    v-model="refTime"
                />
                <v-btn
                    :disabled="!refTime"
                    class="mx-2"
                    fab
                    color="secondary"
                    @click="handleClick"
                >
                    <v-icon>mdi-plus</v-icon>
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
        };
    },
    props: ['audit'],
    methods: {
        openLink(text) {
            // Remove the extra ")." at the end of string
            const url = text.substring(0, text.length - 2);
            require('electron').shell.openExternal(url);
        },

        handleClick() {
            const newAudit = {
                id: this.audit.id,
                refTime: this.refTime
            };
            this.$emit('addAudit', newAudit);
        }
    },
};
</script>

<style scoped>

</style>
