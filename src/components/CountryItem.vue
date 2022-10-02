<script setup lang="ts">
import { xlwrite } from '@/ts/writexlsx'

const props = defineProps({
    srcimg: String,
    ptoName: String,
    ptoDesc: String,
})

let routeto = '/' + props.ptoName
</script>
<template>
    <div
        class="col card border border-success border-1 mx-1 colorcase"
        style="width: 110rem"
    >
        <div class="ratio ratio-4x3">
            <img :alt="props.ptoName" class="mt-2" :src="props.srcimg" />
        </div>

        <div class="card-body">
            <h5 class="card-title">{{ props.ptoName }}</h5>
            <p class="card-text">
                {{ props.ptoDesc }}
            </p>
            <div class="btn-group">
                <RouterLink :to="routeto" class="btn btn-info">
                    Goto {{ props.ptoName }} data Retrival page
                </RouterLink>
                <a
                    href="#"
                    class="btn btn-primary"
                    @click="xlwrite(props.ptoName)"
                >
                    Download Template
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.colorcase {
    background-color: burlywood;
}
</style>
