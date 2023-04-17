export type itemId = String | Number

export interface IItem {
  id: itemId
  parent: itemId | "root"
  type?: any
}
