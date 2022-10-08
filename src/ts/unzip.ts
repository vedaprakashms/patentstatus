import { Command } from '@tauri-apps/api/shell'
import { downloadDir, join, resolve } from '@tauri-apps/api/path'
import { createDir } from '@tauri-apps/api/fs'
let unzip = async (abc: any) => {
    let download = await downloadDir()
    let k = await join(download.toString(), 'PatentSatusData', abc.toString())
    let k1 = await join(download.toString(), 'PatentSatusData')

    await createDir()

    let path = await resolve(k)
    console.log(path)
    const cmd = new Command('extzip', [
        'Expand-Archive',
        '-Path',
        k,
        '-DestinationPath',
        k1,
    ])
    cmd.execute().then((r) => {
        console.log(r)
    })
}

export { unzip }
