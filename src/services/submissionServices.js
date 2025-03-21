const submissionProducer = require('../producers/submissionQueueProducer')

class SubmissionService{
    constructor(submissionRespository){
        this.submissionRespository = submissionRespository

    }
    async  pingCheck(){
        return 'new  new pong'
    }

    async addSubmission(submissionPayload) {
        // console.log(`Submission Payload Recieved ${submissionPayload}`)
        console.log(submissionPayload)
        const submission = await this.submissionRespository.createSubmission(submissionPayload)
        if(!submission){
            throw {message : "Not able to create submission"}
        }
        const response = await submissionProducer(submission)
        return {queueResponse:response, submission}; 
        
    }
}


module.exports= SubmissionService 