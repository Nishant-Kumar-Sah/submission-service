const { fetchProblemDetails } = require('../apis/problemAdminApi');
const submissionProducer = require('../producers/submissionQueueProducer')

class SubmissionService{
    constructor(submissionRespository){
        this.submissionRespository = submissionRespository

    }
    async  pingCheck(){
        return 'new  new pong'
    }

    async addSubmission(submissionPayload) {
        console.log(`Submission Payload Recieved `)
        console.log(submissionPayload)
        const problemId = submissionPayload.problemId;
        const userId = submissionPayload.userId
        console.log(`Problem Id : ${problemId}`)
        const problemAdminApiResponse = await fetchProblemDetails(problemId)

        // if(!problemAdminApiResponse){
        //     throw new SubmissionCreationError(`Failed to create a submission in the repository layer`)
        // }
        console.log(`Printing problem admin api response`)
        const codeStubs = problemAdminApiResponse.data.codeStubs
        console.log(codeStubs)

        const languageCodeStub = codeStubs.find(codeStub => codeStub.language.toLowerCase === submissionPayload.language.toLowerCase)
        console.log(`CodeStub for language ${submissionPayload.language}`)
        console.log(languageCodeStub)

        submissionPayload.code = languageCodeStub.startSnippet +"\n\n"+ submissionPayload.code + "\n\n"+ languageCodeStub.endSnippet
        const submission = await this.submissionRespository.createSubmission(submissionPayload)
        if(!submission){
            throw {message : "Not able to create submission"}
        }
        const response = await submissionProducer({
            [submission._id]:{
                code: submission.code,
                language: submission.language,
                inputCase: problemAdminApiResponse.data.testcases[0].input,
                outputCase: problemAdminApiResponse.data.testcases[0].output,
                userId,
                submissionId : submission._id
            }
        })
        //Handle all test cases
        return {queueResponse:response, submission}; 
        
    }
}


module.exports= SubmissionService 