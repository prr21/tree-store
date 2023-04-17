import TreeStore from "./index"
import items from "./data/items.json"

const ts = new TreeStore(items)

describe("Должен возвращать изначальный массив элементов.", () => {
  test("getAll", () => {
    expect(ts.getAll()).toEqual([
      { id: 1, parent: "root" },
      { id: 2, parent: 1, type: "test" },
      { id: 3, parent: 1, type: "test" },
      { id: 4, parent: 2, type: "test" },
      { id: 5, parent: 2, type: "test" },
      { id: 6, parent: 2, type: "test" },
      { id: 7, parent: 4, type: null },
      { id: 8, parent: 4, type: null },
    ])
  })
})

describe("Принимает id элемента и возвращает сам объект элемента;", () => {
  test("getItem", () => {
    const randomIndex = Math.floor(Math.random() * items.length)
    const item = items[randomIndex]
    const itemId = item.id

    const itemFromTs = ts.getItem(itemId)

    expect(item).toBeTruthy()
    expect(item).toEqual(itemFromTs)
  })

  test("getItem 404", () => {
    const itemFromTs = ts.getItem(4004)

    expect(itemFromTs).toBeUndefined()
  })
})

describe("[getChildren] Принимает id элемента и возвращает массив элементов, являющихся дочерними для того элемента, чей id получен в аргументе. Если у элемента нет дочерних, то должен возвращаться пустой массив;", () => {
  test("getChildren 4", () => {
    const children = ts.getChildren(4)
    expect(children).toEqual([
      { id: 7, parent: 4, type: null },
      { id: 8, parent: 4, type: null },
    ])
  })

  test("getChildren 2", () => {
    const children = ts.getChildren(2)
    expect(children).toEqual([
      { id: 4, parent: 2, type: "test" },
      { id: 5, parent: 2, type: "test" },
      { id: 6, parent: 2, type: "test" },
    ])
  })

  test("getChildren 404", () => {
    const children = ts.getChildren(404)
    expect(children).toHaveLength(0)
  })
})

describe("[getAllChildren] Принимает id элемента и возвращает массив элементов, являющихся прямыми дочерними элементами до самого глубокого уровня", () => {
  test("getAllChildren", () => {
    const allChildren = ts.getAllChildren(2)

    expect(allChildren).toEqual([
      { id: 4, parent: 2, type: "test" },
      { id: 5, parent: 2, type: "test" },
      { id: 6, parent: 2, type: "test" },
      { id: 7, parent: 4, type: null },
      { id: 8, parent: 4, type: null },
    ])
  })
})
describe("[getAllParents] Принимает id элемента и возвращает массив из цепочки родительских элементов", () => {
  test("getAllParents 7", () => {
    const allParents = ts.getAllParents(7)

    expect(allParents).toEqual([
      { id: 4, parent: 2, type: "test" },
      { id: 2, parent: 1, type: "test" },
      { id: 1, parent: "root" },
    ])
  })

  test("getAllParents root", () => {
    const allParents = ts.getAllParents(1)

    expect(allParents).toEqual([])
  })

  test("getAllParents 2", () => {
    const allParents = ts.getAllParents(2)

    expect(allParents).toEqual([{ id: 1, parent: "root" }])
  })

  test("getAllParents 404", () => {
    const allParents = ts.getAllParents(404)

    expect(allParents).toEqual([])
  })
})
