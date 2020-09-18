<template>
    <div class="stepper__content__lh-configs">
        <v-switch
            label="Custom Configs"
            v-model="isCustom"
        />
        <v-expansion-panels class="expansion-panels" :disabled="!isCustom">
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
