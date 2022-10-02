import { useUSPTOStore } from '@/stores/counter'
import { useToast } from 'vue-toastification'
let stringToArray = (data: string) => {
    const toast = useToast()
    let usptoStore = useUSPTOStore()
    let apparray: string[] = []
    let pubarray: string[] = []
    let patarray: string[] = []
    let temp = data.split(/\r?\n/).filter((e) => {
        return e != '' || null || e.match(/US/gim)
    })
    temp.map((e, i) => {
        const rExp1: RegExp = /US[0-9]{2}\/[0-9]{3},[0-9]{3}/gim
        const rExp2: RegExp = /US[0-9]{7,15}/gim
        let temp1 = e.match(rExp1)
        if (temp1) {
            let k = ''
            k = temp1.toString()
            k = k.replace(/[US.,-\/]/g, '')
            k = k.replace(' ', '')
            apparray.push(k)
        } else {
            let temp2 = e.match(rExp2)
            if (temp2 && e.length > 10) {
                let k = e.replace(/[US.,-\/]/g, '')
                k = k.replace(' ', '')
                k = k.replace(
                    /([a,b,c,e,h,p,s,f,j,k,o][0-9]{0,1}){0,1}$/gim,
                    ''
                )
                pubarray.push('*' + k + '*')
            } else {
                let k = e.replace(/[US.,-\/]/g, '')
                k = k.replace(' ', '')
                k = k.replace(
                    /([a,b,c,e,h,p,s,f,j,k,o][0-9]{0,1}){0,1}$/gim,
                    ''
                )
                patarray.push(k)
            }
        }
    })
    console.log(apparray)
    apparray = [...new Set(apparray)]
    patarray = [...new Set(patarray)]
    pubarray = [...new Set(pubarray)]

    usptoStore.updateAppNo(apparray)
    usptoStore.updatePatNo(patarray)
    usptoStore.updatePubNo(pubarray)
    toast.success(
        'Allocated the patent/application/Publication Number to each group below.'
    )
}

export { stringToArray }
