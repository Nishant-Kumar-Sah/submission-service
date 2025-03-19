async function pingRequest(req, res) {
    
    const response = await this.testService.pingCheck()
    return res.send({data: response});

}

async function createSubmission(req, res) {
    const response = await this.submissionService.addSubmiission(req.body)

}

module.exports = {
    pingRequest,
    createSubmission 
}