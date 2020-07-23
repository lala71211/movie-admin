import { defaultDirection, FIREBASE_PATH, DEFAULT_IMAGE } from "../constants/defaultValues";
import { storage } from "./Firebase";

export const mapOrder = (array, order, key) => {
  array.sort(function (a, b) {
    var A = a[key], B = b[key];
    if (order.indexOf(A + "") > order.indexOf(B + "")) {
      return 1;
    } else {
      return -1;
    }
  });
  return array;
};


export const getDateWithFormat = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return dd + '.' + mm + '.' + yyyy;
}

export const getCurrentTime = () => {
  const now = new Date();
  return now.getHours() + ":" + now.getMinutes()
}


export const getDirection = () => {
  let direction = defaultDirection;
  if (localStorage.getItem("direction")) {
    const localValue = localStorage.getItem("direction");
    if (localValue === "rtl" || localValue === "ltr") {
      direction = localValue;
    }
  }
  return {
    direction,
    isRtl: direction === "rtl"
  };
};

export const setDirection = localValue => {
  let direction = "ltr";
  if (localValue === "rtl" || localValue === "ltr") {
    direction = localValue;
  }
  localStorage.setItem("direction", direction);
};

export const getUrlImage = (
  location, fileName
) => {
  return new Promise((resolve, reject) => {
    if (fileName == null || fileName === '') {
      return resolve(DEFAULT_IMAGE);
    } else {
      let pathReference = storage.refFromURL(`${FIREBASE_PATH}/${location}`);
      let starsRef = pathReference.child(fileName);
  
      return starsRef
        .getDownloadURL()
        .then((url) => {
          // let img = document.querySelector(".avatar");
          return url
        })
        .catch((error) => {
          switch (error.code) {
            case "storage/object-not-found":
              break;
  
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
  
            case "storage/unknown":
              // Unknown error occurred, inspect the server response
              break;
  
            default:
              break;
          }
        });
    }
  });
}

