import { useUSPTOStore } from '@/stores/counter'
import { path } from '@tauri-apps/api'
import {
    BaseDirectory,
    createDir,
    readDir,
    readTextFile,
    removeFile,
    writeBinaryFile,
} from '@tauri-apps/api/fs'
import { getClient, Body, fetch, ResponseType } from '@tauri-apps/api/http'
import {
    appDir,
    downloadDir,
    extname,
    join,
    resolve,
} from '@tauri-apps/api/path'
import { invoke } from '@tauri-apps/api/tauri'
import { assert } from '@vue/compiler-core'
import { useToast, POSITION } from 'vue-toastification'
import { unzip } from './unzip'
let payloadArray: payload_Type[] = []
let getDetails = async () => {
    //start of init
    //init Toastification
    const toast = useToast()
    // init pinia store
    const usptoStore = useUSPTOStore()
    // init http client for http request
    const client = await getClient()
    //init temp array to store the chunk data
    let appPayLoadArray: Array<string> = []
    let pubPayLoadArray: Array<string> = []
    let patPayLoadArray: Array<string> = []
    let packageArray: any = []
    //------------------------------------------------
    //spliting the application number array stored in the store to managebale chunks
    await splitIntoChunk(usptoStore.appno).then((res) => {
        res.forEach((e) => {
            appPayLoadArray.push(e.join(' '))
        })
        convertSearchString(appPayLoadArray, 'app')
    })

    //spliting the application number array stored in the store to managebale chunks
    await splitIntoChunk(usptoStore.patno).then((res) => {
        res.forEach((e) => {
            patPayLoadArray.push(e.join(' '))
        })
        convertSearchString(patPayLoadArray, 'pat')
    })
    //spliting the application number array stored in the store to managebale chunks
    await splitIntoChunk(usptoStore.pubno).then(async (res) => {
        res.forEach((e) => {
            pubPayLoadArray.push(e.join(' '))
        })
        convertSearchString(pubPayLoadArray, 'pub')
    })
    // end of spliting hte array of 700 each.
    //converting the split 700 each array to search strings
    console.log(appPayLoadArray)
    console.log(patPayLoadArray)
    console.log(pubPayLoadArray)

    console.log(payloadArray)
    toast.info(
        'The entire search numbers are cut into ' +
            payloadArray.length.toLocaleString() +
            ' queries.',
        { position: 'top-center' as POSITION, timeout: 4000 }
    )
    payloadArray.forEach(async (e) => {
        await client
            .request({
                method: 'POST',
                url: 'https://ped.uspto.gov/api/queries',
                body: Body.json(e),
                timeout: 50,
            })
            .then(async (res: any) => {
                console.log(res)
                //console.log(res.data.createQueryRequest.searchText)
                await client
                    .request({
                        method: 'PUT',
                        url:
                            'https://ped.uspto.gov/api/queries/' +
                            res.data.queryId +
                            '/package?format=JSON',
                    })
                    .then((res) => {
                        setTimeout(() => {
                            fetch(res.url.replace('package', 'download'), {
                                method: 'GET',
                                responseType: ResponseType.Binary,
                            }).then(async (zipfiledata: any) => {
                                toast.info(
                                    'completed download of ' +
                                        res.url.replace('package', 'download'),
                                    {
                                        position: 'top-center' as POSITION,
                                    }
                                )
                                const downloadDirPath = await downloadDir()
                                let kpath = await resolve(
                                    downloadDirPath,
                                    'PatentSatusData'
                                )
                                let kbool: Boolean = true
                                await invoke('exists2', { path: kpath }).then(
                                    async (r) => {
                                        console.log(r)
                                        ;(await r)
                                            ? (kbool = false)
                                            : (kbool = true)
                                        if (kbool) {
                                            await createDir('PatentSatusData', {
                                                dir: BaseDirectory.Download,
                                            })
                                        }
                                    }
                                )
                                writeBinaryFile(
                                    'PatentSatusData\\' +
                                        zipfiledata.url.split('/')[5] +
                                        '.zip',
                                    zipfiledata.data,
                                    { dir: BaseDirectory.Download }
                                ).then(() => {
                                    unzip(
                                        zipfiledata.url.split('/')[5] + '.zip'
                                    ).then((r) => {
                                        console.log(r)
                                    })
                                })
                            })
                        }, 40000)
                    })
            })
            .catch(console.log)
        toast.info(
            'Sent all Application numbers to be queried in USPTO, waiting for 30seconds to finish querying & start downloading.',
            {
                position: 'top-center' as POSITION,
                timeout: 40000,
            }
        )
    })
}
// Function to Split the array of string to chunks of 700 each
let splitIntoChunk = async (params: string[]) => {
    let templist = []
    while (params.length > 0) {
        let tempArray
        tempArray = params.splice(0, 700)
        //console.log(tempArray.join(' '))
        templist.push(tempArray)
    }
    return templist
}

//function to change convert the 700 chunks to payload to send .
let convertSearchString = async (
    payloadArrayparm: Array<string>,
    payloadType: string
) => {
    for (let i of payloadArrayparm) {
        switch (payloadType) {
            case 'app':
                console.log(payloadType)
                payloadArray.push({
                    searchText: 'applId:(' + i + ')',
                    fq: [],
                    fl: '*',
                    mm: '0%',
                    df: 'patentTitle',
                    qf: 'appEarlyPubNumber applId appLocation appType appStatus_txt appConfrNumber appCustNumber appGrpArtNumber appCls appSubCls appEntityStatus_txt patentNumber patentTitle inventorName firstNamedApplicant appExamName appExamPrefrdName appAttrDockNumber appPCTNumber appIntlPubNumber wipoEarlyPubNumber pctAppType firstInventorFile appClsSubCls rankAndInventorsList',
                    facet: 'true',
                    sort: 'applId asc',
                    start: '0',
                })
                break

            case 'pub':
                console.log(payloadType)
                payloadArray.push({
                    searchText: 'appEarlyPubNumber:(' + i + ')',
                    fq: [],
                    fl: '*',
                    mm: '0%',
                    df: 'patentTitle',
                    qf: 'appEarlyPubNumber applId appLocation appType appStatus_txt appConfrNumber appCustNumber appGrpArtNumber appCls appSubCls appEntityStatus_txt patentNumber patentTitle inventorName firstNamedApplicant appExamName appExamPrefrdName appAttrDockNumber appPCTNumber appIntlPubNumber wipoEarlyPubNumber pctAppType firstInventorFile appClsSubCls rankAndInventorsList',
                    facet: 'true',
                    sort: 'applId asc',
                    start: '0',
                })
                break

            case 'pat':
                console.log(payloadType)
                payloadArray.push({
                    searchText: 'patentNumber:(' + i + ')',
                    fq: [],
                    fl: '*',
                    mm: '0%',
                    df: 'patentTitle',
                    qf: 'appEarlyPubNumber applId appLocation appType appStatus_txt appConfrNumber appCustNumber appGrpArtNumber appCls appSubCls appEntityStatus_txt patentNumber patentTitle inventorName firstNamedApplicant appExamName appExamPrefrdName appAttrDockNumber appPCTNumber appIntlPubNumber wipoEarlyPubNumber pctAppType firstInventorFile appClsSubCls rankAndInventorsList',
                    facet: 'true',
                    sort: 'applId asc',
                    start: '0',
                })
                break

            default:
                break
        }
    }
}

async function processEntries(entries: any) {
    for (const entry of entries) {
        console.log(`Entry: ${entry.path}`)
        const k = await extname(entry.path)
        assert(k !== 'json', `${entry.path} is a json file.`)
        if (entry.children) {
            processEntries(entry.children)
        }
    }
}
export { getDetails }
