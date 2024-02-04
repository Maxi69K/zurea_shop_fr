import { useState, useEffect } from "react";

function useLocalStorage(key, initValue) {

    const [lsValue, setLsValue] = useState(() => {
         if (localStorage.hasOwnProperty(key)) {
           return JSON.parse(localStorage.getItem(key));
         }
    })

    useEffect(() => {
      if (localStorage.hasOwnProperty(key)) {
        setLsValue(JSON.parse(localStorage.getItem(key)));
      } else if (initValue) {
        localStorage.setItem(key, JSON.stringify(initValue));
        setLsValue(initValue);
      }
    }, [key, initValue]);

    const setValue = (value) => {
        localStorage.setItem(key, JSON.stringify(value));
        setLsValue(value);
    }

    return [lsValue, setValue];
}

export default useLocalStorage;