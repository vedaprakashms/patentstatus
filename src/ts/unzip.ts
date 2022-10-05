import { Command } from '@tauri-apps/api/shell'
import { desktopDir, join, resolve } from '@tauri-apps/api/path'
let unzip = async () => {
    let desk = await desktopDir()
    let k = await join(desk, '2.zip')
    let path = await resolve(k)
    console.log(path)
    const cmd = new Command('extzip', [
        'Expand-Archive',
        '-Path',
        k,
        '-DestinationPath',
        desk,
    ])
    cmd.execute().then((r) => {
        console.log(r)
    })
}

export { unzip }
