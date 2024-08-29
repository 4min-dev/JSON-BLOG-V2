async function getSortQuery(sortQuery) {
    const [sortKey,sortValue] = sortQuery.split(':')
    const sort = typeof sortKey === 'string' && !isNaN(sortValue) ? { [sortKey]:parseInt(sortValue,2) } : { "albumId":1 }
    
    return sort
}

module.exports = getSortQuery