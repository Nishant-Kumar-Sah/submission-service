const Submission = require('../models/submissionModels')

class submissonRepository {
    constructor() {
        this.submissionModel = Submission
    }
    async createSubmission(submission) {
        const response = await this.submissionModel.create(submission)
        return response
    }
}

module.exports = submissonRepository