<template>
    <div class="report scrollbar">
        <!--<div class="report__header">
            <v-btn
                class="report__header__close-btn"
                @click="$emit('close')"
                icon
            >
                <v-icon color="danger">mdi-close-circle</v-icon>
            </v-btn>
        </div>-->
        <div class="report__content">
            <!-- If isPowertest = true, "reports" are an array of "audits" for multiple URLs -->
            <template v-if="isPowertest">
                <v-tabs
                    active-class="active-tab"
                    show-arrows
                    slider-color="primary"
                    class="fixed-tabs-bar"
                    background-color="secondary"
                >
                    <v-tab v-for="(_, count) in reports" :key="count">
                        Route {{ count + 1 }}
                    </v-tab>
                    <v-tab-item v-for="audits in reports" :key="audits.url">
                        <div class="tab__header">
                            <v-btn
                                @click="$emit('close')"
                                class="tab__header__close-btn"
                                color="danger"
                                icon
                            >
                                <v-icon color="danger">mdi-close-circle</v-icon>
                            </v-btn>
                            <h3>{{ audits.url }}</h3>
                        </div>
                        <AuditItem
                            v-for="audit in audits"
                            :key="audit.id"
                            :audit="audit"
                        />
                    </v-tab-item>
                </v-tabs>
            </template>
            <!-- If isPowertest = false, actually "reports" are "audits" of a single URL -->
            <AuditItem
                v-else
                v-for="audit in reports"
                :key="audit.id"
                :audit="audit"
            />
        </div>
    </div>
</template>

<script>
import AuditItem from './AuditItem/AuditItem.vue';
export default {
    components: { AuditItem },
    props: ['audits', 'reports', 'isPowertest']
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
    margin-bottom: 25px;
}

.tab__header {
    color: var(--second-color);
    position: fixed;
    right: 15px;
}

.tab__header__close-btn {
    position: relative;
    left: 45%;
}

.active-tab {
    /*background-color: var(--third-color);*/
    color: var(--fourth-color) !important;
}
</style>
