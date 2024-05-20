import { onAuth } from "../utils/adminLinks.mjs";
import { API_LOGIN_URL } from "../utils/constants.mjs";


const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTm9haCIsImVtYWlsIjoiTm9haEBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcxNDY3OTcxNX0.WfTYnxSjNozWfH2ZLsEnYcRYjhI0C0x_ky46uzSnyTg'; 

        document.getElementById('fetchUserInfoBtn').addEventListener('click', async () => {
            try {
                const response = await fetch('https://v2.api.noroff.dev/blog/posts/Noah', { // Bytt ut med riktig API-endepunkt
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const userInfo = await response.json();
                console.log('User Info:', userInfo);

                document.getElementById('userInfo').innerText = JSON.stringify(userInfo, null, 2);
            } catch (error) {
                console.error('Error fetching user info:', error);
                document.getElementById('userInfo').innerText = 'Error fetching user info';
            }
        });