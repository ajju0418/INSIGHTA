/**
 * IndexedDB Service for NEXURA
 * Provides persistent storage using IndexedDB API
 */

const DB_NAME = 'nexura_db'
const DB_VERSION = 1

export interface DBStore {
  name: string
  keyPath: string
  indexes?: { name: string; keyPath: string; unique?: boolean }[]
}

export const STORES: DBStore[] = [
  {
    name: 'habits',
    keyPath: 'id',
    indexes: [
      { name: 'date', keyPath: 'date', unique: false },
      { name: 'habitId', keyPath: 'habitId', unique: false },
    ],
  },
  {
    name: 'expenses',
    keyPath: 'id',
    indexes: [
      { name: 'date', keyPath: 'date', unique: false },
      { name: 'category', keyPath: 'category', unique: false },
    ],
  },
  {
    name: 'goals',
    keyPath: 'id',
  },
  {
    name: 'user',
    keyPath: 'id',
  },
  {
    name: 'settings',
    keyPath: 'key',
  },
]

class IndexedDBService {
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    if (typeof window === 'undefined') {
      throw new Error('IndexedDB is only available in the browser')
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => {
        reject(new Error('Failed to open database'))
      }

      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create object stores
        STORES.forEach((store) => {
          if (!db.objectStoreNames.contains(store.name)) {
            const objectStore = db.createObjectStore(store.name, {
              keyPath: store.keyPath,
            })

            // Create indexes
            store.indexes?.forEach((index) => {
              objectStore.createIndex(index.name, index.keyPath, {
                unique: index.unique || false,
              })
            })
          }
        })
      }
    })
  }

  private ensureDB(): IDBDatabase {
    if (!this.db) {
      throw new Error('Database not initialized. Call init() first.')
    }
    return this.db
  }

  async get<T>(storeName: string, key: string): Promise<T | undefined> {
    const db = this.ensureDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.get(key)

      request.onsuccess = () => {
        resolve(request.result)
      }

      request.onerror = () => {
        reject(new Error(`Failed to get ${key} from ${storeName}`))
      }
    })
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    const db = this.ensureDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.getAll()

      request.onsuccess = () => {
        resolve(request.result || [])
      }

      request.onerror = () => {
        reject(new Error(`Failed to get all from ${storeName}`))
      }
    })
  }

  async put<T>(storeName: string, value: T): Promise<void> {
    const db = this.ensureDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.put(value)

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = () => {
        reject(new Error(`Failed to put to ${storeName}`))
      }
    })
  }

  async delete(storeName: string, key: string): Promise<void> {
    const db = this.ensureDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.delete(key)

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = () => {
        reject(new Error(`Failed to delete ${key} from ${storeName}`))
      }
    })
  }

  async clear(storeName: string): Promise<void> {
    const db = this.ensureDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.clear()

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = () => {
        reject(new Error(`Failed to clear ${storeName}`))
      }
    })
  }

  async query<T>(
    storeName: string,
    indexName: string,
    queryValue: any
  ): Promise<T[]> {
    const db = this.ensureDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const index = store.index(indexName)
      const request = index.getAll(queryValue)

      request.onsuccess = () => {
        resolve(request.result || [])
      }

      request.onerror = () => {
        reject(new Error(`Failed to query ${indexName} in ${storeName}`))
      }
    })
  }
}

// Singleton instance
export const dbService = new IndexedDBService()

