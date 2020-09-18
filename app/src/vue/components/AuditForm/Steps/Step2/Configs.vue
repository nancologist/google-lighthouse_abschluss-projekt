<template>
    <div class="stepper__content__lh-configs">
        <v-switch
            label="Custom Configs"
            :value="isCustom"
            @change="$emit('update:isCustom', $event)"
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
    props: ['isCustom'],
    components: { ConfigAudit },
    data: () => ({
        configAudits,
    }),
};
</script>
