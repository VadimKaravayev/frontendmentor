class Model {
  constructor() {
    const openRequest = indexedDB.open("newsletter-db", 1);
    openRequest.onsuccess = (e) => {
      console.log("db is ready");
      //We need to init db here if it is already in browser.
      this.db = e.target.result;
    };
    openRequest.onupgradeneeded = (e) => {
      //Fires when db is not yet created
      //Fire when version of db is outdated
      this.db = e.target.result;
      this.db.createObjectStore("subscribers", { keyPath: "email" });
    };
    openRequest.onerror = () => {
      console.log("Failed to open db");
    };
  }
  save(email, successHandler, failHandler) {
    const transaction = this.db.transaction("subscribers", "readwrite");
    const objectStore = transaction.objectStore("subscribers");
    const query = objectStore.add({ email });
    query.onsuccess = successHandler;
    query.onerror = failHandler;
  }
}

//ObjectStore is similar to tables or collections
//Every object in the object store must have a primary key
