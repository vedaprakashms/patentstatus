import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { log } from 'node:console'

export const useUSPTOStore = defineStore('uspto', () => {
    let applicationNo = ref<patData[]>([])
    let publicationNo = ref<patData[]>([])
    let PatentNo = ref<patData[]>([])
    let appno = ref<string[]>([])
    let pubno = ref<string[]>([])
    let patno = ref<string[]>([])
    let results = ref<PatentData[]>([])

    let updateAppNo = (data: Array<string>) => {
        data.forEach((element) => {
            applicationNo.value.push({
                id: element,
                color: 'secondary',
            })
            appno.value.push(element)
        })
    }
    let updatePubNo = (data: Array<string>) => {
        data.forEach((element) => {
            publicationNo.value.push({
                id: element,
                color: 'secondary',
            })
            pubno.value.push(element)
        })
    }
    let updatePatNo = (data: Array<string>) => {
        data.forEach((element) => {
            PatentNo.value.push({
                id: element,
                color: 'secondary',
            })
            patno.value.push(element)
        })
    }

    let updateResults = async (data: PatentData[]) => {
        data.forEach((e: PatentData) => {
            results.value.push(e)
        })
    }

    let update1AppNo = (data: string) => {
        const index = applicationNo.value.findIndex((object) => {
            return object.id === data
        })
        applicationNo.value[index].color = 'success'
    }

    return {
        applicationNo,
        publicationNo,
        PatentNo,
        updateAppNo,
        updatePubNo,
        updatePatNo,
        update1AppNo,
        appno,
        pubno,
        patno,
        results,
        updateResults,
    }
})
