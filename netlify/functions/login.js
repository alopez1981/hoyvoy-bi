exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {statusCode: 405, body: 'Method not allowed'};
    }

    const {email, password} = JSON.parse(event.body);

    const validEmail = process.env.BI_EMAIL;
    const validPassword = process.env.BI_PASSWORD;

    if (email === validEmail && password === validPassword) {
        return {
            statusCode: 200,
            body: JSON.stringify({ok: true})
        };
    }

    return {
        statusCode: 401,
        body: JSON.stringify({ok: false})
    };
};