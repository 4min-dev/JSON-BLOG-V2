export interface IGenericList<T> {
    items:T[],
    renderItem:(item:T, index?:number) => React.ReactNode,
    containerClassname?:string
}