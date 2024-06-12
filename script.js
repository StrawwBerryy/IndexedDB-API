// This is what our customer data looks like.
const customerData = [
    { ssn: "666-66-6666", name: "Eddie", age: 21, email: "eddie@st.com" },
    { ssn: "777-77-7777", name: "Max", age: 17, email: "max@st.com" },
];
  
let db;

const dbName = "the_name";

const request = indexedDB.open(dbName, 2);

request.onerror = (event) => {
  // Handle errors.
};

request.onsuccess = (event) =>{
    db = request.result;
};

request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // Create an objectStore to hold information about our customers. We're
  // going to use "ssn" as our key path because it's guaranteed to be
  // unique - or at least that's what I was told during the kickoff meeting.
  const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

  // Create an index to search customers by name. We may have duplicates
  // so we can't use a unique index.
  objectStore.createIndex("name", "name", { unique: false });

  // Create an index to search customers by email. We want to ensure that
  // no two customers have the same email, so use a unique index.
  objectStore.createIndex("email", "email", { unique: true });

  // Use transaction oncomplete to make sure the objectStore creation is
  // finished before adding data into it.
  objectStore.transaction.oncomplete = (event) => {
    // Store values in the newly created objectStore.
    const customerObjectStore = db
      .transaction("customers", "readwrite")
      .objectStore("customers");
    customerData.forEach((customer) => {
      customerObjectStore.add(customer);
    });
  };
};

console.log(db);

const transaction = request.transaction(["customers"], "readwrite");

transaction.oncomplete = (event) => {
    console.log("transacion opened!");
};

transaction.onerror = (event) => {
    console.log("transaction could not be opened!");
};

const objectStore = transaction.objectStore("customers");

customerData.forEach((customer) => {
    const request = objectStore.add(customer);
    request.onsuccess = (event) => {
        console.log("transaction completed!");
    };
});
