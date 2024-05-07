// import { API_USER_URL, acsessToken } from "./constants.mjs";

// export const doFetch = async (method, url, body, ) => {
//     console.log('Fetching', url);
//     try {
//         const response = await fetch(url, {
//             method: method,
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: 'Bearer' + acsessToken
//             },
//             body: JSON.stringify(body)
//         });
//         const data = await response.json();
//         return data.data;
        
//     } catch (error) {
//         console.error('Error during fetch:', error);
//         throw error; 
//     }
// };

import {acsessToken } from "./constants.mjs";

export async function doFetch (url, options = {}) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer' + acsessToken
        };
        const combinedOptions = {headers, ...options };
        const response = await fetch (url, combinedOptions);
        const json = await response.json ();
        return json;
    }
    catch (error){
        console.log(error);
        throw error;
    }
    finally {

    }
}
