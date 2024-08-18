import { IGenericList } from '../../../ts/interfaces/lists/IGenericList'

function List<T> ({items,renderItem,containerClassname}:IGenericList<T>) {
  return (
    <div className={`listContainer ${containerClassname}`}>
      {items.map(renderItem)}
    </div>
  )
}

export default List