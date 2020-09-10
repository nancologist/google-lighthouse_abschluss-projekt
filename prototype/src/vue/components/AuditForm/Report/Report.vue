<template>
    <div class="report scrollbar">
<!--        <div class="report__header">-->
<!--            <v-btn-->
<!--                class="report__header__close-btn"-->
<!--                @click="$emit('close')"-->
<!--                icon-->
<!--            >-->
<!--                <v-icon color="danger">mdi-close-circle</v-icon>-->
<!--            </v-btn>-->
<!--        </div>-->
        <div class="report__content">
            <!-- If isPowertest = true, "reports" are an array of "audits" for multiple URLs -->
            <template v-if="isPowertest">
                <v-tabs
                    active-class="active-tab"
                    show-arrows
                    slider-color="secondary"
                >
                    <v-tab v-for="(_, count) in reports" :key="count">
                        URL {{ count + 1 }}
                    </v-tab>
                    <v-tab-item v-for="audits in reports" :key="audits.url">
                        <h3 style="color: var(--second-color)">{{ audits.url }}</h3>
                        <AuditItem
                            v-for="audit in audits"
                            :key="audit.id"
                            :audit="audit"
                        />
                    </v-tab-item>
                    <v-btn
                        class="report__header__close-btn"
                        @click="$emit('close')"
                        icon
                    >
                        <v-icon color="danger">mdi-close-circle</v-icon>
                    </v-btn>
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
    /*padding-top: 10px;*/
    padding-bottom: 10px;
}

.sticky {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: white;
}

.report__header__close-btn {
    position: absolute;
    top: 10%;
    right: 0;
}

.active-tab {
    /*background-color: var(--third-color);*/
    color: var(--third-color) !important;
}
</style>
