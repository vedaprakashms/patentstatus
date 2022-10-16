import { Command } from '@tauri-apps/api/shell'
import { downloadDir, join, resolve } from '@tauri-apps/api/path'
import {
    createDir,
    exists,
    readDir,
    readTextFile,
    removeDir,
    removeFile,
    writeFile,
    writeTextFile,
} from '@tauri-apps/api/fs'
import { useUSPTOStore } from '@/stores/counter'

let unzip = async (abc: any) => {
    let download = await downloadDir()
    let k = await join(download.toString(), 'PatentSatusData', abc.toString())
    let k1 = await join(
        download.toString(),
        'PatentSatusData',
        'extract',
        abc.replace('.zip', '')
    )

    ;((await exists(k1)) as unknown as Boolean)
        ? ''
        : await createDir(k1, { recursive: true })

    let path = await resolve(k)
    let usptostore = useUSPTOStore()
    //console.log(path)
    const cmd = new Command('extzip', [
        'Expand-Archive',
        '-Path',
        k,
        '-DestinationPath',
        k1,
    ])
    cmd.execute().then(async (r) => {
        //console.log(r)
        await readDir(k1).then(async (res) => {
            //console.log(res)
            res.forEach(async (filepath) => {
                //console.log(filepath.path)
                //do all actions of each file and add them to the results.
                await readTextFile(filepath.path).then((text) => {
                    //console.log('contents of file : ' + filepath.path)
                    //console.log(JSON.parse(text).PatentData)
                    usptostore.updateResults(JSON.parse(text).PatentData)
                })

                await removeFile(filepath.path)
            })
        })
        setTimeout(() => {
            removeDir(k1, { recursive: true })
<<<<<<< HEAD
            console.log(usptostore.results)
            //writeTextFile('anc.json', JSON.stringify(usptostore.results))
=======
            //console.log(usptostore.results)
            writeTextFile('anc.json', JSON.stringify(usptostore.results))
>>>>>>> 9b0dba4c7fc9f40874a862bdc5a32c4c51bb4eb4
        }, 50000)
    })
    return usptostore.results
}

export { unzip }
