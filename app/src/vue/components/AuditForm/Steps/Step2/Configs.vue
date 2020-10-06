<template>
    <div class="stepper__content__lh-configs">
        <v-switch
            label="Advance Mode"
            v-model="isCustom"
        />
        <div v-show="!isCustom">
            <strong>Default Configurations</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad dolores eum facilis illum necessitatibus officia sed! Aspernatur harum laudantium, minus modi praesentium quia recusandae rem, sit tenetur unde veniam voluptatem!
            </p>
        </div>
        <v-expansion-panels class="expansion-panels" v-show="isCustom">
            <ConfigAudit
                v-for="configAudit in configAudits"
                :key="configAudit.id"
                :audit="configAudit"
                @addAudit="$emit('addAudit', $event)"
                @removeAudit="$emit('removeAudit', $event)"
            />
        </v-expansion-panels>
    </div>
</template>

<script>
import ConfigAudit from './ConfigAudit/ConfigAudit.vue';
const { audits: configAudits } = require('../../../../data/data.json');
export default {
    components: { ConfigAudit },
    data: () => ({
        configAudits,
        isCustom: false,
    }),
};
</script>
