const axiosInstance = require('../config/axiosInstance')
const {SOCKET_SERVICE_URL} = require('../config/serverConfig')

async function sendOutputPayload(payload){
    try {
        const uri = SOCKET_SERVICE_URL + `/sendPayload`;
        const response = await axiosInstance.post(uri,payload)
        return response.data
    }catch(error) {
        console.error(`Error Occured while sending output payload to Socket-service`)
        console.error(error)
    }
}

module.exports=sendOutputPayload 