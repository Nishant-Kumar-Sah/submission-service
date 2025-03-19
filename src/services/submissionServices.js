const submissionProducer = require('../producers/submissionQueueProducer')

class SubmissionService{
    constructor(){

    }
    async  pingCheck(){
        return 'new  new pong'
    }

    async addSubmission(submission) {
        const response = await submissionProducer(submission)
        return response; 
        
    }
}


module.exports= SubmissionService 