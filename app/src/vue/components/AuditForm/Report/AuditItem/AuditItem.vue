<template>
    <div class="audit" v-if="!!audit.id">
        <h4>{{ audit.title }}</h4>
        <div class="result-items-container">
            <div class="result-item">
                <span>Score</span>
                <v-progress-circular
                    :rotate="360"
                    :size="100"
                    :width="15"
                    :value="getScore"
                    :color="getColor"
                >
                    {{ getScore }}
                </v-progress-circular>
            </div>
            <div class="result-item">
                <span>Ref. Difference</span>
                <v-icon x-large :color="getDiff.iconColor">
                    {{ getDiff.icon }}
                </v-icon>
                <span>{{ getDiff.val }} %</span>
            </div>
        </div>
        <v-divider/>
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
            num = num = Number(num.toFixed());
            return {
                val: num,
                icon: num < 0 ? 'mdi-arrow-down-drop-circle' : 'mdi-arrow-up-drop-circle',
                iconColor: num < 0 ? 'danger' : 'secondaryDark'
            };
        },
        getRefTime() {
            return this.audit.refTime / 1000;
        },
        getScore() {
            return this.audit.score * 100;
        },
        getColor() {
            if (this.getScore > 75) return 'secondaryDark';
            if (this.getScore > 50) return 'warning';
            return 'danger';
        }
    }
};
// audit:
// {
//     "id": "first-contentful-paint",
//     "title": "First Contentful Paint",
//     "description": "First Contentful Paint marks the time at which the first text or image is painted. [Learn more](https://web.dev/first-contentful-paint/).",
//     "score": 0.79,
//     "scoreDisplayMode": "numeric",
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

    .result-items-container {
        display: flex;
        justify-content: space-evenly;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .result-item {
        text-align: center;
        display: flex;
        flex-direction: column;
    }

    .result-item > *:first-child {
        margin-bottom: 5px;
    }
</style>
