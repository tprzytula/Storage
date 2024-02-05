import { reducer, initialState } from './index'
import { Actions } from './types'

describe('Given the reducer', () => {
  describe('When SET_STORAGE action is invoked', () => {
    it('should update the storage', () => {
      const exampleStorage = [
        {
          id: '1',
          name: 'Toilet Paper',
          icon: 'water',
          quantity: 5,
          form: 'rolls',
          collection: 'storage',
        },
        {
          id: '2',
          name: 'Paper Tower',
          icon: 'water',
          quantity: 2,
          form: 'rolls',
          collection: 'storage',
        },
      ]

      const result = reducer(initialState, {
        type: Actions.SET_STORAGE,
        payload: exampleStorage,
      })

      expect(result).toStrictEqual({
        ...initialState,
        storage: exampleStorage,
      })
    })
  })

  describe('When ADD_STORAGE_ITEM action is invoked', () => {
    it('should update the storage', () => {
      const exampleItem = {
        id: '1',
        name: 'Toilet Paper',
        icon: 'water',
        quantity: 5,
        form: 'rolls',
        collection: 'storage',
      }

      const result = reducer(initialState, {
        type: Actions.ADD_STORAGE_ITEM,
        payload: exampleItem,
      })

      expect(result).toStrictEqual({
        ...initialState,
        storage: [exampleItem],
      })
    })
  })

  describe('When REMOVE_STORAGE_ITEM action is invoked', () => {
    it('should remove the item from the storage', () => {
      const exampleItems = [
        {
          id: '1',
          name: 'Toilet Paper',
          icon: 'water',
          quantity: 5,
          form: 'rolls',
          collection: 'storage',
        },
        {
          id: '2',
          name: 'Toilet Paper',
          icon: 'water',
          quantity: 5,
          form: 'rolls',
          collection: 'storage',
        },
        {
          id: '3',
          name: 'Toilet Paper',
          icon: 'water',
          quantity: 5,
          form: 'rolls',
          collection: 'storage',
        },
      ]

      const result = reducer(
        {
          ...initialState,
          storage: exampleItems,
        },
        {
          type: Actions.REMOVE_STORAGE_ITEM,
          payload: '2',
        }
      )

      expect(result).toStrictEqual({
        ...initialState,
        storage: [exampleItems[0], exampleItems[2]],
      })
    })
  })

  describe('When UPDATE_STORAGE_ITEM action is invoked', () => {
    it('should update the item', () => {
      const exampleItems = [
        {
          id: '1',
          name: 'Toilet Paper',
          icon: 'water',
          quantity: 5,
          form: 'rolls',
          collection: 'storage',
        },
        {
          id: '2',
          name: 'Toilet Paper',
          icon: 'water',
          quantity: 5,
          form: 'rolls',
          collection: 'storage',
        },
        {
          id: '3',
          name: 'Toilet Paper',
          icon: 'water',
          quantity: 5,
          form: 'rolls',
          collection: 'storage',
        },
      ]

      const result = reducer(
        {
          ...initialState,
          storage: exampleItems,
        },
        {
          type: Actions.UPDATE_STORAGE_ITEM,
          payload: {
            id: '2',
            name: 'Toilet Paper',
            icon: 'water',
            quantity: 10,
            form: 'rolls',
            collection: 'storage',
          },
        }
      )

      expect(result).toStrictEqual({
        ...initialState,
        storage: [
          exampleItems[0],
          {
            id: '2',
            name: 'Toilet Paper',
            icon: 'water',
            quantity: 10,
            form: 'rolls',
            collection: 'storage',
          },
          exampleItems[2],
        ],
      })
    })
  })
})
