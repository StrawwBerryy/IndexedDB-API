const actors = [
  {
    "name" : "Eddie",
    "age" : 25, 
    "email" : "eddie@st.com",
    "id" : "1jk1ui3hy2i1u3"
  },
  {
    "name" : "Max",
    "age" : 19,
    "email" : "max@st.com",
    "id" : "12j3b1hk3v2"
  }
];

var db;
var request = window.indexedDB.open("MyFamily");

request.onerror = event => {
  console.error("Database error: " + event.target.errorCode);
};
request.onsuccess = event => {
  db = event.target.result;
};

const makeObjectStore = () => {
   const objectStore = request.createObjectStore(["actors", { keyPath: "id" }]);

   objectStore.createIndex("name", "name", { unique : false });
   objectStore.createIndex("email", "email", { unique : true });

   const transaction = objectStore.transaction("actors", "readwrite");
   transaction.oncomplete = () => {
      actors.forEach((actor) => {
        transaction.objectStore("actors").add(actor);
      });
   };
};

makeObjectStore();