window.onload = () => {
 // Hold an instance of a db object for us to store the IndexedDB data in
  let db;

  // Let us open our database
  const DBOpenRequest = window.indexedDB.open('songs', 3);

  // Register two event handlers to act on the database being opened successfully, or not
  DBOpenRequest.onerror = (event) => {
    console.log("db cant init");
  };

  
const songs = [
  {
    "name" : "Unsure",
    "artist" : "Alan Walker",
    "id" : "j21h3412g41341h"
  },
  {
    "name" : "Alone pt.2",
    "artist" : "Alan Walker",
    "id" : "nuio21hu2ih3uy1i"
  }
];


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

    const lolz = transaction.get("nuio21hu2ih3uy1i");

    lolz.onsuccess = () => {
      console.log(lolz.result);
    };

    lolz.onerror = () => {
      console.log("fuck u ");
    };

    const addbtn = document.getElementById("addBtn");

    addbtn.addEventListener("click", () => {
      addData();
      console.log("event listener added to the button!");
    });
  };

  const addData = async () => {
    const transaction = db.transaction("songs", "readwrite");
    const objectStore = transaction.objectStore("songs");
  
    transaction.oncomplete = () => {
      console.log("Adding data complete!");
    };
  
    transaction.onerror = async (error) =>{
      console.log(error);
    };  
  
    songs.forEach((e) => {
     const req =  objectStore.add(e);
     req.onsuccess  = () => {
      console.log("request complete, data has been added!");
     };
    });
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

