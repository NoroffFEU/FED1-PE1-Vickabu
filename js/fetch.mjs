const BASE_URL = 'https://v2.api.noroff.dev';

export const USER_URL = `${BASE_URL}blog/posts/Noah`;
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;


export async function doFetch(url, options{}) {
  try {
    const response = await fetch(url);
    const json = await response.json();

  } catch (error) {
    throw error

  }
}

/*export const doFetch = async (method, noroffapi, body)  => {

    console.log("Doing fetch call towards: ", noroffapi);
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let accessToken = ""
    if(userInfo){
      accessToken = userInfo.accessToken
    }
    try {
      const response = await fetch(noroffapi, {
        method: method,
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
      console.log(data);
      return data.data;

    } catch (err) {
      console.log(err);
    }
  };*/
