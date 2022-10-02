import { read, utils } from 'xlsx'
import { useToast } from 'vue-toastification'
import { useUSPTOStore } from '@/stores/counter'

let readxlUS = async (data: any) => {
    const toast = useToast()
    let usptoStore = useUSPTOStore()
    toast.warning('Reading the Excel file...', { timeout: 2000 })
    const wb = read(data)
    //reading the USPTO sheet and putting it in Json format for easier data processing.
    let ws = wb.Sheets['USPTO']
    let Sheetdata = utils.sheet_to_json(ws)
    //Initialization of temp variables for storing Patent number, Application Number & Publication Number.
    let PatentNo: any = [],
        ApplicationNo: any = [],
        PublicationNo: any = []

    // processing the JSON data
    Sheetdata.map((e: any) => {
        // Removing Patent Numbers Unrelated Char like "US", Kind Code, spaces etc...
        let k = ''
        k = e['Patent Number']
        if (k) {
            k = k.toLocaleString()
            k = k.replace(/[US.,-\/]/g, '')
            k = k.replace(' ', '')
            k = k.replace(/([a,b,c,e,h,p,s,f,j,k,o][0-9]{0,1}){0,1}$/gim, '')
            PatentNo.push(k)
        }
        // Removing Patent Numbers Unrelated Char like "US", "/", ",", Spaces etc...
        k = e['Application Number']
        if (k) {
            k = k.toLocaleString()
            k = k.replace(/[US.,-\/]/g, '')
            k = k.replace(' ', '')
            ApplicationNo.push(k)
        }

        // Removing Patent Numbers Unrelated Char like "US", Kind Code, spaces etc...
        k = e['Publication Number']
        if (k) {
            k = k.toLocaleString()
            k = k.replace(/[US.,-\/]/g, '')
            k = k.replace(' ', '')
            k = k.replace(/([a,b,c,e,h,p,s,f,j,k,o][0-9]{0,1}){0,1}$/gim, '')
            PublicationNo.push('*' + k + '*')
        }
    })
    usptoStore.updateAppNo([])
    usptoStore.updateAppNo(ApplicationNo)
    usptoStore.updatePatNo([])
    usptoStore.updatePatNo(PatentNo)
    usptoStore.updatePubNo([])
    usptoStore.updatePubNo(PublicationNo)
    // Showing a toast after completion of reading the data points.
    toast.success(
        'Imported Patent Numbers, Application Numbers, Publication Numbers ',
        {
            timeout: 2000,
        }
    )
    return { PatentNo, ApplicationNo, PublicationNo }
}

export { readxlUS }
