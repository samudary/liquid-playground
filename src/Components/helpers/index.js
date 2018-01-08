const helpers = {
  isJsonString(str) {
    try {
      JSON.parse(str);
    }
    catch (e) {
      return false;
    }
    return true;
  },
  copyToClipBoard(data) {
    // Create a "hidden" input
    let aux = document.createElement("input");
    // Assign it the value of the specified element
    aux.setAttribute("value", data);
    // Append it to the body
    document.body.appendChild(aux);
    // Highlight its content
    aux.select();
    // Copy the highlighted text
    document.execCommand("copy");
    // Remove it from the body
    document.body.removeChild(aux);
  },
  storageAvailable(type) {
    try {
      let storage = window[type],
        x = '__storage__test';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch (e) {
      let storage = window[type];
      return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        //Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0;
    }
  },
  liquidStorageSetter(customLiquidObject) {
    if (this.storageAvailable('localStorage')) {
      localStorage.setItem('customLiquidObject', JSON.stringify(customLiquidObject));
    } else {
      console.log("Local storage not available");
    }
  },
  liquidStorageGetter() {
    if (this.storageAvailable('localStorage')) {
      return localStorage.getItem('customLiquidObject');
    } else {
      console.log("Local storage not available");
    }
  },
  liquidStorageDeleter(key) {
    if (this.storageAvailable('localStorage')) {
      let storedObject = JSON.parse(this.liquidStorageGetter());
      delete storedObject[key];
      this.liquidStorageSetter(storedObject);
    } else {
      console.log('Local storage is not available');
    }
  },
  promiseGetter() {
    return new Promise((resolve, reject) => {
      if (this.liquidStorageGetter() !== 'undefined') {
        let value = JSON.parse(this.liquidStorageGetter())
        resolve(value)
      }

      if (this.liquidStorageGetter() === 'undefined') {
        reject({})
      }
    })
  }
}

module.exports = helpers;