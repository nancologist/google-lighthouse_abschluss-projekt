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
    methods: {
        // addConfigAudit(newConfigAudit) {
        //     const alreadyAdded = this.auditForm.configs.audits.findIndex((configAudit) => configAudit.id === newConfigAudit.id) > -1;
        //     if (!alreadyAdded) {
        //         this.auditForm.configs.audits.push(newConfigAudit);
        //     }
        // },
        //
        // removeConfigAudit(auditId) {
        //     this.auditForm.configs.audits = this.auditForm.configs.audits.filter((audit) => audit.id !== auditId);
        // },
    }
};
</script>
