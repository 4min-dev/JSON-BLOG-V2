type TGetTotalPages = {
    totalContent:number,
    contentLimit:number
}

export default function getTotalPages({totalContent, contentLimit}:TGetTotalPages) {
    return Math.ceil(totalContent / contentLimit)
}