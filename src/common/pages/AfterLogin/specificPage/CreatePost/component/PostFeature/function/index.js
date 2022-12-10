function CreateObjectStore(
    dbName, 
    storeName, 
    setLocalSavedData, 
    setSaveLocalData
) {
    let request = indexedDB.open(dbName);
    let database;

    request.onsuccess = async function (e){
        database = e.target.result;
        
        /* access current objectstore */
        if(database.objectStoreNames.contains(storeName)){
            let transaction = database.transaction(storeName, "readwrite");
            let saveData = transaction.objectStore(storeName);

            const requestGetData = saveData.getAll();

            requestGetData.onsuccess = function() {
                setLocalSavedData(requestGetData.result[0].data);
                setSaveLocalData(true);
            };
        } else {
            setSaveLocalData(false);
        }

        database.close();
    }
}

function SaveObjectStore(
    dbName, 
    storeName,
    dish_name,
    description,
    backgroundImg,
    tagList,
) {
    let request = indexedDB.open(dbName);
    let database;

    request.onsuccess = function (e){
        database = e.target.result;
        let version =  parseInt(database.version);
        database.close();
        let secondRequest = indexedDB.open(dbName, version + 1);

        secondRequest.onupgradeneeded = function (e) {
            database = e.target.result;
            database.createObjectStore(storeName, {keyPath: 'id'})
        };

        secondRequest.onerror = function (e) {
            ('Error occur')
        }

        secondRequest.onsuccess = function (e) {
            let data = {
                dish_name: dish_name, 
                description: description,
                backgroundImg: backgroundImg,
                tagList: tagList
            }
            
            let transaction = database.transaction(['save_data'], "readwrite");
            let saveData = transaction.objectStore("save_data");

            saveData.add({ data , id: '1'});

            database.close();
        }
    }
}

function DeleteObjectStore(
    dbName, 
    storeName
){
    let request = indexedDB.open(dbName);
    let database;

    request.onsuccess = function (e){
        database = e.target.result;
        let version = parseInt(database.version);
        database.close();
        let secondRequest = indexedDB.open(dbName, version + 1);

        secondRequest.onupgradeneeded = function (e) {
            database = e.target.result;
            database.deleteObjectStore(storeName);
        };
    }
}

export { CreateObjectStore, SaveObjectStore, DeleteObjectStore }