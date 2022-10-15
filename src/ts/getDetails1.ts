import { getClient, Body, ResponseType, fetch } from '@tauri-apps/api/http'
import { useUSPTOStore } from '@/stores/counter'
import { POSITION, useToast } from 'vue-toastification'
import { unzip } from '@/ts/unzip'
import { downloadDir, resolve } from '@tauri-apps/api/path'
import {
    writeBinaryFile,
    BaseDirectory,
    createDir,
    readDir,
    readTextFile,
    removeFile,
} from '@tauri-apps/api/fs'
import { invoke } from '@tauri-apps/api/tauri'

const toast = useToast()

let getDetails = async () => {
    let usptoStore = useUSPTOStore()
    const client = await getClient()
    let packageArray: any = []
    let appPayLoadArray: Array<string> = []
    await splitIntoChunk(usptoStore.appno).then((r) => {
        r.forEach((element) => {
            appPayLoadArray.push(element.join(' '))
        })
    })
    appPayLoadArray.forEach(async (element) => {
        let payload = {
            searchText:
                'applId:(17610895 17450545 17411251 17533999 17534058 17418225 17026180 17484351 17400749 17378887 17226670 16660276 17123065 16484735 17096027 17374640 16491554 17356378 17356994 17211476 16376267 17322341 17308981 17049971 16141518 16733451 16499772 17249061 17251040 16167256 16865783 17163763 16950023 15667409 17034927 16489952 17106634 17016301 16950085 16796011 17038638 16132744 16601498 16959429 16909840 16155661 16935387 16489903 16919506 16167277 16909833 16907472 16367697 16899728 16813487 16867555 16849207 16846561 16760438 16853215 16823530 16792630 16206770 16735622 16155727 16715607 16499202 16691548 16692702 16692633 16280448 16595338 16593920 16571422 16557991 16553683 16556353 15978463 16509571 16053416 16449986 15469286 16271365 16268077 16243960 15231241 16258104 15923090 16181745 16199199 15478973 16153507 15595591 16011932 15920722 16114379 15969748 15969738 15969744 15469245 15765829 15542631 15974311 14547038 15971605 15452272 15455679 15199675 15914078 15740643 15877944 15485849 15710957 15711167 15711244 15710980 15711005 15711136 14739927 15785692 15340488 15718665 15622554 15622573 15622707 15622516 15622531 15378045 15194526 15211563 15089664 15626449 15218609 15492980 15485193 15484177 15123022 14739883 15457701 15317493 15123005 15122949 15122986 15123244 15123043 15122963 15122973 15122750 15350458 15122734 15224497 15122720 15123241 15122677 15122704 15257640 15257649 15121170 15121123 15080352 14664893 15081600 15040466 14626698 14940379 14979613 14861816 14957644 14817341 14282145 14806008 14702445 14462369 14579760 14303842 13778175 13109851 12878989 10677098 10659129 10659642 10659128 10658978)',
            fq: [],
            fl: '*',
            mm: '0%',
            df: 'patentTitle',
            qf: 'appEarlyPubNumber applId appLocation appType appStatus_txt appConfrNumber appCustNumber appGrpArtNumber appCls appSubCls appEntityStatus_txt patentNumber patentTitle inventorName firstNamedApplicant appExamName appExamPrefrdName appAttrDockNumber appPCTNumber appIntlPubNumber wipoEarlyPubNumber pctAppType firstInventorFile appClsSubCls rankAndInventorsList',
            facet: 'true',
            sort: 'applId asc',
            start: '0',
        }
        payload.searchText = 'applId:(' + element + ')'
        await client
            .request({
                method: 'POST',
                url: 'https://ped.uspto.gov/api/queries',
                body: Body.json(payload),
            })
            .then(async (r: any) => {
                console.log(r)
                console.log(r.data.queryId)
                let k = await client.request({
                    method: 'PUT',
                    url:
                        'https://ped.uspto.gov/api/queries/' +
                        r.data.queryId +
                        '/package?format=JSON',
                })
                packageArray.push(k)
            })
        console.log(packageArray)
        console.time('abc')
        toast.info(
            'Sent all Application numbers to be queried in USPTO, waiting for 30seconds to finish querying & start downloading.',
            {
                position: 'top-center' as POSITION,
                timeout: 40000,
            }
        )
    })
    setTimeout(() => {
        packageArray.forEach((element: any) => {
            //toast.info(element.url.replace('package', 'download'))

            fetch(element.url.replace('package', 'download'), {
                method: 'GET',
                responseType: ResponseType.Binary,
            }).then(async (rurl: any) => {
                console.log(rurl)
                const downloadDirPath = await downloadDir()
                let kpath = await resolve(downloadDirPath, 'PatentSatusData')

                let kbool: Boolean = true
                await invoke('exists2', { path: kpath }).then(async (r) => {
                    console.log(r)
                    ;(await r) ? (kbool = false) : (kbool = true)
                    if (kbool) {
                        await createDir('PatentSatusData', {
                            dir: BaseDirectory.Download,
                        })
                    }
                    writeBinaryFile(
                        'PatentSatusData\\' + rurl.url.split('/')[5] + '.zip',
                        rurl.data,
                        {
                            dir: BaseDirectory.Download,
                        }
                    ).then(async () => {
                        await unzip(rurl.url.split('/')[5] + '.zip').then(
                            async (r) => {
                                toast.success(
                                    'wrote the file ' +
                                        rurl.url.split('/')[5] +
                                        '.zip'
                                )
                                console.log(r)
                                // await readDir(r, {
                                //     recursive: true,
                                // }).then(async (entries) => {
                                //     for (let i = 0; i < entries.length; i++) {
                                //         const element = entries[i]
                                //         console.log(`Entry: ${element.path}`)
                                //         await readTextFile(
                                //             element.path,
                                //             {}
                                //         ).then(async (r) => {
                                //             let temp_one = await JSON.parse(r)
                                //             await usptoStore.updateResults(
                                //                 temp_one.PatentData
                                //             )
                                //             console.log('Reading results store')
                                //             console.log(usptoStore.results)
                                //         })

                                //         await removeFile(element.path, {})
                                //     }
                                // })
                            }
                        )
                    })
                })
            })
        })
    }, 40000)
}

let splitIntoChunk = async (params: string[]) => {
    let templist = []
    while (params.length > 0) {
        let tempArray
        tempArray = params.splice(0, 700)
        templist.push(tempArray)
    }
    return templist
}

// function processEntries(entries) {
//     for (const entry of entries) {
//         console.log(`Entry: ${entry.path}`)
//         if (entry.children) {
//             processEntries(entry.children)
//         }
//     }
// }

export { getDetails }
