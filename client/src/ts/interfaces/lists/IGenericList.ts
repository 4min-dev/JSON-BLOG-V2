export interface IGenericList<T> {
    items:T[],
    renderItem:(item:T) => React.ReactNode,
    containerClassname?:string
}