export async function doFetch (method, url, body) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    let accessToken = ''
    if (userInfo) {
        accessToken = userInfo.data.accessToken
    }
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ` + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = await response.json()
        return data.data

    } catch (error) {
        console.log(error);
        
    } 
}

