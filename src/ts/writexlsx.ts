import { utils, writeFileXLSX } from 'xlsx'
import { useUSPTOStore } from '@/stores/counter'
import { useToast } from 'vue-toastification'

async function xlwrite(country = '') {
    /* flatten objects */
    const USrows = [
        {
            patNo: 'US7925623B2',
            appNo: 'US14/462,369',
        },
        {
            patNo: 'US7246140B2',
            appNo: 'US13/778,175',
        },
    ]

    const EProws = [
        {
            patNo: 'EP1540510',
            appNo: 'EP03755811',
        },
        {
            patNo: 'EP1540478',
            appNo: 'EP03749544',
        },
    ]

    let rows = []

    country === 'USPTO' ? (rows = USrows) : (rows = EProws)

    /* generate worksheet and workbook */
    const worksheet = utils.json_to_sheet(rows)
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, country)

    /* fix headers */
    utils.sheet_add_aoa(worksheet, [['Patent Number', 'Application Number']], {
        origin: 'A1',
    })

    /* create an XLSX file and try to save to Presidents.xlsx */
    writeFileXLSX(workbook, country + '.xlsx')
}

let xlFinalWrite = () => {
    let usptoStore = useUSPTOStore()
    const toast = useToast()
<<<<<<< HEAD
    console.log(usptoStore.results)
=======
    //console.log(usptoStore.results)
>>>>>>> 9b0dba4c7fc9f40874a862bdc5a32c4c51bb4eb4

    toast.success('writing final excel.')
}

export { xlwrite, xlFinalWrite }
