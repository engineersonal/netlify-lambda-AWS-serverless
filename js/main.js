const fetchUsers = async () => {
    // await (await fetch('/.netlify/functions/getusers')).json();
    try {
        const response = await fetch("/.netlify/functions/getusers");
        if (!response.ok) { // NOT res.status >= 200 && res.status < 300
            return { statusCode: response.status, body: response.statusText };
        }
        const data = await response.json();

        return {
            statusCode: 200,
            body: data.value
            // if you want to return whole json string
            // headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify(data)
        };
    } catch (err) {
        console.log(err); // output to netlify function log
        return {
            statusCode: 500,
            body: err.message // Could be a custom message or object i.e. JSON.stringify(err)
        };
    }
}

fetchUsers().then(data => {

    userList = document.querySelector('#users');

    data.forEach(user=>{
        const li = document.createElement('li');
        li.className = 'list-group-item';
        const link = document.createElement('a');
        link.appendChild(document.createTextNode(user.login));
        link.href = user.html_url;
        link.target = '_blank';
        link.appendChild(link);
        userList.appendChild(li);
    });
    
});