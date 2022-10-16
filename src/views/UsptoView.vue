<script setup lang="ts">
import { ref } from 'vue'
import { useUSPTOStore } from '@/stores/counter'
import { readxlUS } from '@/ts/readxlsx'
import { stringToArray } from '@/ts/readString'
import { getDetails } from '@/ts/getDetails'
let patstring = ref('')
let usptoStore = useUSPTOStore()
let onFileSelected = async (e: any) => {
    const file = e.target.files[0]
    const data = await file.arrayBuffer()
    readxlUS(data).then((r) => {
        getDetails().then(() => {})
    })
}
let onStringSelected = async () => {
    stringToArray(patstring.value).then(() => getDetails().then(() => {}))
}
</script>
<template>
    <router-link to="/">
        <span class="h5">Home</span>
    </router-link>
    <div class="container">
        <div class="row my-2">
            <div class="col-2">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/75/Seal_of_the_United_States_Patent_and_Trademark_Office.svg"
                    alt="uspto"
                    width="120"
                    class="mx-auto d-table"
                />
            </div>
            <div class="col text-center">
                <div class="row">
                    <h1 class="display-5 text-danger text-decoration-underline">
                        USPTO PAIR Data Extraction
                    </h1>
                    <h3>Publication, Application and Patent Numbers</h3>
                </div>
            </div>
            <div class="col-2">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/75/Seal_of_the_United_States_Patent_and_Trademark_Office.svg"
                    alt="uspto"
                    width="120"
                    class="mx-auto d-table"
                />
            </div>
        </div>

        <div class="input-group my-2">
            <input type="file" class="form-control" @change="onFileSelected" />
        </div>
        <div class="input-group my-2">
            <textarea
                class="form-control"
                rows="4"
                v-model="patstring"
            ></textarea>
            <button class="btn btn-success" @click="onStringSelected">
                Extract
            </button>
        </div>
    </div>
    <div class="row text-center">
        <span class="col display-6 text-danger text-decoration-underline">
            Application Numbers <br />
            {{ usptoStore.applicationNo.length }}
        </span>
        <span class="col display-6 text-danger text-decoration-underline">
            Publication Numbers
            <br />
            {{ usptoStore.publicationNo.length }}
        </span>
        <span class="col display-6 text-danger text-decoration-underline">
            Patent Numbers
            <br />
            {{ usptoStore.PatentNo.length }}
        </span>
    </div>
    <div
        class="row text-center"
        style="max-height: 30vh; overflow-y: scroll; margin: 20px"
    >
        <div class="col">
            <div
                class="card"
                v-for="(i, j) in usptoStore.applicationNo"
                :key="j"
            >
                <h4 class="card-title" :id="i.color">{{ i.id }}</h4>
            </div>
        </div>
        <div class="col">
            <div class="card" v-for="i in usptoStore.publicationNo" :key="i.id">
                <h4 class="card-title" :id="i.color">
                    {{ i.id }}
                </h4>
            </div>
        </div>
        <div class="col">
            <div class="card" v-for="i in usptoStore.PatentNo" :key="i.id">
                <h4 class="card-title" :id="i.color">{{ i.id }}</h4>
            </div>
        </div>
    </div>
</template>

<style scoped>
#secondary {
    background-color: rgb(207, 206, 206);
}
#success {
    background-color: rgb(152, 248, 152);
}
</style>
