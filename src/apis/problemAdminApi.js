const fastify = require('fastify')({logger:true});
const axiosInstance = require('../config/axiosInstance')
const {PROBLEM_ADMIN_SERVICE_URL} = require('../config/serverConfig')
const PROBLEM_ADMIN_API_URL  = `${PROBLEM_ADMIN_SERVICE_URL}/api/v1`
async function fetchProblemDetails(problemId) {
    try {
        const uri = PROBLEM_ADMIN_API_URL + `/problems/${problemId}`;
        const response = await axiosInstance.get(uri)
        console.log(`Successfully fetched problem with id : ${problemId}`)
        // fastify.log.info("Api Response : ", response)
        // console.log(response)
        return response.data

    }catch(error) {
        fastify.log.error("Something went wrong while fetching problem details")
        fastify.log.error(error)
    }
}

module.exports = {
    fetchProblemDetails
}