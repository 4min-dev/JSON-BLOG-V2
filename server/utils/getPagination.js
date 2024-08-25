async function getPagination({currPage, limitQuery}) {
    return parseInt((currPage - 1) * limitQuery)
}

module.exports = getPagination