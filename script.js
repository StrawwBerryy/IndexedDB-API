window.onload = () => {
  
  const songs = [
    {
      "name" : "Faded",
      "artist" : "Alan Walker",
      "id" : "hu1bh2ubj2o1ej2"
    },
    {
      "name" : "Alone",
      "artist" : "Alan Walker",
      "id" : "niajhwuo2huo2h"
    }
  ];
 // Hold an instance of a db object for us to store the IndexedDB data in
  let db;

  // Let us open our database
  const DBOpenRequest = window.indexedDB.open('songs', 3);

  // Register two event handlers to act on the database being opened successfully, or not
  DBOpenRequest.onerror = (event) => {
    console.log("db cant init");
  };

  DBOpenRequest.onsuccess = (event) => {
    console.log("DB init");
    db = DBOpenRequest.result;

    const transaction = db.transaction("songs", "readwrite").objectStore("songs");
    transaction.oncomplete = () =>{
      console.log("tran complete");
    };

    transaction.onerror = () => {
      console.log("tran imcomplete");
    };

    const lolz = transaction.get("hu1bh2ubj2o1ej2");

    lolz.onsuccess = () => {
      console.log(lolz.result);
    };

    lolz.onerror = () => {
      console.log("fuck u ");
    };
  };

  DBOpenRequest.onupgradeneeded = (event) => {
    db = event.target.result;

    db.onerror = (event) => {
      console.log("error loading database");
    };


    // Create an objectStore for this database
    const objectStore = db.createObjectStore(["songs"], { keyPath: "id"});
    objectStore.createIndex("name", "name", { unique: false});
    objectStore.createIndex("id", "id", { unique : true});

    objectStore.transaction.oncomplete = (event) => {
      // Store values in the newly created objectStore.
      console.log("complete");
    };

    
  };  
};
