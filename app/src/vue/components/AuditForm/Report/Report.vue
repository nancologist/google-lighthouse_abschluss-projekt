<template>
    <div class="report scrollbar report--have-tabs">
        <div class="report__content">
            <v-tabs
                active-class="active-tab"
                show-arrows
                slider-color="primary"
                class="fixed-tabs-bar"
                background-color="secondary"
            >
                <span style="align-self: center; margin-left: 5px;">Routes:</span>
                <template v-show="reports.length > 1">
                    <v-tab v-for="(_, count) in reports" :key="count">
                        {{ count + 1 }}
                    </v-tab>
                </template>
                <v-tab-item v-for="audits in reports" :key="audits.url">
                    <div class="bottom-sheet__header">
                        <v-btn icon>
                            <v-icon>mdi-export-variant</v-icon>
                        </v-btn>
                        <v-tooltip
                            bottom
                            close-delay="600"
                            transition="slide-x-reverse-transition"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon
                                    v-bind="attrs"
                                    v-on="on"
                                    color="secondaryDark"
                                >
                                    mdi-routes
                                </v-icon>
                            </template>
                            <span>{{ audits.url }}</span>
                        </v-tooltip>
                        <v-btn
                            @click="$emit('close')"
                            color="danger"
                            icon
                        >
                            <v-icon color="danger">mdi-close-circle</v-icon>
                        </v-btn>
                    </div>
                    <AuditItem
                        v-for="audit in audits"
                        :key="audit.id"
                        :audit="audit"
                    />
                </v-tab-item>
            </v-tabs>
        </div>
    </div>
</template>

<script>
import AuditItem from './AuditItem/AuditItem.vue';
export default {
    components: { AuditItem },
    props: ['audits', 'reports'],
};
</script>

<style scoped>
.report {
    background-color: white;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    color: var(--first-color);
    overflow: scroll;
    text-align: center;
    padding-top: 10px;
}

.report--have-tabs {
    margin-bottom: 25px;
}

.bottom-sheet__header {
    color: var(--second-color);
    position: fixed;
    right: 15px;
}

.bottom-sheet__header > *:not(:last-child) {
    margin-right: 10px;
}

.active-tab {
    color: white !important;
}
</style>
