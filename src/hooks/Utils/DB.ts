
const DB = () => {
  /**
 * 封装的方法以及用法
 * 打开数据库
 */
  const openDB = (dbName: string, storeName: string, version = 1) => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const indexedDB = window.indexedDB;

      const request = indexedDB.open(dbName, version);

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        resolve(db);
      };

      request.onerror = (event) => {
        reject(event);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(storeName)) {
          const objectStore = db.createObjectStore(storeName, { keyPath: 'uuid' });
          objectStore.createIndex('uuid', 'uuid', { unique: true }); // 创建索引 可以让你搜索任意字段
          objectStore.createIndex("name", "name");
          objectStore.createIndex("data", "data")
        }
      };
    });
  }

  /**
   * 新增数据
   */
  const addData = (db: IDBDatabase, storeName: string, data: any) => {
    return new Promise<void>((resolve, reject) => {
      const request = db.transaction([storeName], 'readwrite')
        .objectStore(storeName)
        .add(data);

      request.onsuccess = () => resolve();
      request.onerror = (event) => {
        if (event.target) {
          const error = (event.target as IDBRequest).error;
          if (error) throw new Error(error.message);
        }
        reject(event);
      };
    });
  }

  /**
   * 通过主键读取数据
   */
  const getDataByKey = (db: IDBDatabase, storeName: string, key: any) => {
    return new Promise<any>((resolve, reject) => {
      const transaction = db.transaction([storeName]);
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.get(key);

      request.onerror = (event) => reject(event);
      request.onsuccess = (event) => resolve((event.target as IDBOpenDBRequest).result);
    });
  }

  /**
   * 通过游标读取数据
   */
  const cursorGetData = (db: IDBDatabase, storeName: string) => {
    const list: any[] = [];

    const transaction = db.transaction(storeName, 'readwrite');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.openCursor();

    return new Promise<any[]>((resolve, reject) => {
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          list.push(cursor.value);
          cursor.continue();
        } else {
          resolve(list);
        }
      };

      request.onerror = (event) => reject(event);
    });
  }

  /**
   * 通过索引读取数据
   */
  const getDataByIndex = (
    db: IDBDatabase,
    storeName: string,
    indexName: string,
    indexValue: any
  ) => {
    const store = db.transaction(storeName, 'readwrite').objectStore(storeName);
    const request = store.index(indexName).get(indexValue);

    return new Promise<any>((resolve, reject) => {
      request.onerror = (event) => reject(event);
      request.onsuccess = (event) => resolve((event.target as IDBOpenDBRequest).result);
    });
  }

  /**
   * 通过索引和游标查询记录
   */
  const cursorGetDataByIndex = (
    db: IDBDatabase,
    storeName: string,
    indexName: string,
    indexValue: any
  ) => {
    const list: any[] = [];
    const store = db.transaction(storeName, 'readwrite').objectStore(storeName);
    const request = store.index(indexName).openCursor(IDBKeyRange.only(indexValue));

    return new Promise<any[]>((resolve, reject) => {
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          list.push(cursor.value);
          cursor.continue();
        } else {
          resolve(list);
        }
      };

      request.onerror = (ev) => reject(ev);
    });
  }

  /**
   * 更新数据
   */
  const updateDB = (db: IDBDatabase, storeName: string, data: any) => {
    const request = db.transaction([storeName], 'readwrite')
      .objectStore(storeName)
      .put(data);

    return new Promise<void>((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = (ev) => resolve(); // 修改为 reject(ev); 以正确处理错误
    });
  }

  /**
   * 删除数据
   */
  const deleteDB = (db: IDBDatabase, storeName: string, uuid: any) => {
    const request = db.transaction([storeName], 'readwrite')
      .objectStore(storeName)
      .delete(uuid);

    return new Promise<void>((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = (ev) => resolve(); // 修改为 reject(ev); 以正确处理错误
    });
  }

  /**
   * 删除数据库
   */
  const deleteDBAll = (dbName: string) => {
    console.log(dbName);
    const deleteRequest = window.indexedDB.deleteDatabase(dbName);
    return new Promise<void>((resolve, reject) => {
      deleteRequest.onerror = () => console.log('删除失败');
      deleteRequest.onsuccess = () => console.log('删除成功');
    });
  }

  /**
   * 关闭数据库
   */
  const closeDB = (db: IDBDatabase) => {
    db.close();
    console.log('数据库已关闭');
  }

  return {
    openDB,
    addData,
    getDataByKey,
    cursorGetData,
    getDataByIndex,
    cursorGetDataByIndex,
    updateDB,
    deleteDB,
    deleteDBAll,
    closeDB
  }
}

export default DB