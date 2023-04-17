import { IItem, itemId } from "./types"

export default class TreeStore {
  protected items: IItem[]
  protected itemsMap = new Map<itemId, IItem>()
  protected childrenMap = new Map<itemId, Set<itemId>>()

  constructor(items: IItem[]) {
    this.items = items

    this.items.forEach((item) => {
      this.itemsMap.set(item.id, item)

      const parentId = item.parent
      let parentChildren = this.childrenMap.get(parentId)

      if (!parentChildren) {
        this.childrenMap.set(parentId, new Set())
        parentChildren = this.childrenMap.get(parentId) as Set<itemId>
      }

      parentChildren.add(item.id)
    })
  }

  protected _getChildrenIds(id: itemId) {
    const childIds = this.childrenMap.get(id) || []
    return Array.from(childIds)
  }

  getAll() {
    return this.items
  }

  getItem(id: itemId) {
    return this.itemsMap.get(id)
  }

  getChildren(id: itemId) {
    const childrenIds = this._getChildrenIds(id)

    return childrenIds.map((id) => this.getItem(id))
  }

  getAllChildren(id: itemId): any {
    const childrenIds = this._getChildrenIds(id)
    const result = []

    for (const id of childrenIds) {
      result.push(this.getItem(id))

      const nestedChildrenIds = this._getChildrenIds(id)
      childrenIds.push(...nestedChildrenIds)
    }
    return result
  }

  getAllParents(id: itemId) {
    const item = this.getItem(id)
    if (item === undefined) return []

    const result = []
    let parent = item.parent

    while (parent !== "root") {
      const item = this.getItem(parent) as IItem
      result.push(item)

      parent = item.parent
    }

    return result
  }
}
