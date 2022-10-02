import { utils, writeFileXLSX } from 'xlsx'

async function xlwrite(country = '') {
    /* flatten objects */
    const USrows = [
        {
            patNo: 'US7925623B2',
            appNo: 'US14/462,369',
            PubNo: 'US20170076227A1',
        },
        {
            patNo: 'US7246140B2',
            appNo: 'US13/778,175',
            PubNo: 'US20170076596A1',
        },
    ]

    const EProws = [
        {
            patNo: 'EP1540510',
            appNo: 'EP03755811',
            PubNo: 'EP1540510',
        },
        {
            patNo: 'EP1540478',
            appNo: 'EP03749544',
            PubNo: 'EP1540478',
        },
    ]

    let rows = []

    country === 'USPTO' ? (rows = USrows) : (rows = EProws)

    /* generate worksheet and workbook */
    const worksheet = utils.json_to_sheet(rows)
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, country)

    /* fix headers */
    utils.sheet_add_aoa(
        worksheet,
        [['Patent Number', 'Application Number', 'Publication Number']],
        {
            origin: 'A1',
        }
    )

    /* create an XLSX file and try to save to Presidents.xlsx */
    writeFileXLSX(workbook, country + '.xlsx')
}

export { xlwrite }
