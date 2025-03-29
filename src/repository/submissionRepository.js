const Submission = require('../models/submissionModels')

class submissonRepository {
    constructor() {
        this.submissionModel = Submission
    }
    async createSubmission(submission) {
        try {
            const response = await this.submissionModel.create(submission)
            console.log(`Succesfully created a submission in DB`)
            return response
        }catch(error) {
            console.error(`Failed to create a submission in DB: ${error}`)
        }
    }
}

module.exports = submissonRepository