<template>
    <div class="audit" v-if="!!audit.id">
        <h4>{{ audit.title }}</h4>
        <small><strong>Description:</strong> {{ audit.description.split(' [')[0] }}</small>
        <div class="result-container">
            <template v-if="audit.scoreDisplayMode === 'numeric'">
                <div class="result-item">
                    <span>Lighthouse Score</span>
                    <v-progress-circular
                        :rotate="360"
                        :size="90"
                        :width="15"
                        :value="getScore.val"
                        :color="getScore.color"
                    >
                        {{ getScore.val }}
                    </v-progress-circular>
                </div>
                <div class="result-item" v-if="getRefTime">
                    <span>Ref. Difference</span>
                    <div style="padding-top: 20px"></div>
                    <v-icon x-large :color="getDiff.iconColor">
                        {{ getDiff.icon }}
                    </v-icon>
                    <span>{{ getDiff.val }} %</span>
                </div>
                <div class="result-item">
                    <span>Duration (sec)</span>
                    <div style="padding-top: 30px"></div>
                    <div class="text-h5">{{ getDuration }}</div>
                </div>
                <div class="result-item" v-if="getRefTime">
                    <span>Ref. Time (sec)</span>
                    <div style="padding-top: 30px"></div>
                    <div class="text-h5">{{ getRefTime }}</div>
                </div>
            </template>
            <template v-else-if="audit.scoreDisplayMode === 'binary'">
                <v-icon :color="binaryAudit.iconColor">{{ binaryAudit.icon }}</v-icon>
            </template>
            <template v-else-if="audit.scoreDisplayMode === 'informative'">
                <v-expansion-panels flat hover tile style="padding: 0">
                    <v-expansion-panel>
                        <v-expansion-panel-header color="secondary" style="max-width: 170px; border-radius: 5px;">More Details</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <ul>
                                <li v-for="(v, k, i) in audit" :key="i">
                                    <pre>{{ k }} : {{ v }}</pre>
                                </li>
                            </ul>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </template>
            <template v-else-if="audit.scoreDisplayMode === 'notApplicable'">
                <span>
                    <v-icon color="warning">mdi-minus-circle</v-icon>
                    Not Applicable!
                </span>
            </template>
            </div>
        <v-divider style="margin-top: 10px"/>
    </div>
</template>

<script>
export default {
    props: ['audit'],
    computed: {
        getDuration() {
            let num = this.audit.numericValue / 1000;
            num = Number(num.toFixed(2));
            return num;
        },
        getDiff() {
            const { refTime, numericValue } = this.audit;
            let num = (refTime - numericValue) * 100 / refTime;
            num = Number(num.toFixed());
            const betterThanExpected = (num < 0);
            return {
                val: num,
                icon: betterThanExpected ? 'mdi-arrow-up-drop-circle' : 'mdi-arrow-down-drop-circle',
                iconColor: betterThanExpected ? 'secondaryDark' : 'danger',
            };
        },
        getRefTime() {
            return this.audit.refTime / 1000;
        },
        getScore() {
            const val = Number((this.audit.score * 100).toFixed());
            let color = 'danger';
            if (val > 50) color = 'warning';
            if (val > 75) color = 'secondaryDark';
            return {
                val,
                color
            };
        },
        binaryAudit() {
            const auditPassed = (this.audit.score === 1);
            return {
                icon: auditPassed ? 'mdi-thumb-up' : 'mdi-thumb-down',
                iconColor: auditPassed ? 'secondaryDark' : 'danger'
            };
        }
    }
};
// audit:
// {
//     "id": "first-contentful-paint",
//     "title": "First Contentful Paint",
//     "description": "First Contentful Paint marks the time at which the first text or image is painted. [Learn more](https://web.dev/first-contentful-paint/).",
//     "score": 0.79,
//     "scoreDisplayMode": ["numeric", "binary", "informative", "manual", "notApplicable"]
//     "numericValue": 2845.5780000000004,
//     "numericUnit": "millisecond",
//     "displayValue": "2.8 s"
// }
</script>

<style scoped>
    .audit {
        margin-top: 10px;
        padding: 5px 12px;
        text-align: left;
    }

    .result-container {
        display: flex;
        justify-content: space-evenly;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .result-item {
        align-items: center;
        text-align: center;
        display: flex;
        flex-direction: column;
    }

    .result-item > *:first-child {
        margin-bottom: 5px;
    }
</style>
