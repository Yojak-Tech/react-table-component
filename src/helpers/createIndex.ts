type CreateIndex = {
    currentPage: number
    rows: Array<any>
    index: number
}

const createIndex = ({ currentPage, rows, index }: CreateIndex) => {
    return (currentPage-1)*10*(Math.ceil(rows?.length/10) )+ index
}

export default createIndex