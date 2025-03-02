export class SubmissionHandler {
    constructor(questionManager) {
        this.submissionQueue = [];
        this.submitting = false;
        this.questionManager = questionManager;
    }

    initialize() {
        HTML_GLOBALS.submit_button.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Retry failed submissions periodically
        setInterval(() => this.retryFailedSubmissions(), 1000 * 60);
    }

    handleSubmit() {
        if (this.submitting) return;

        const formData = this.prepareFormData();
        if (!this.validate(formData)) return;

        this.submitting = true;
        this.submissionQueue.push(formData);
        this.processQueue();
    }

    processQueue() {
        if (this.submitting || this.submissionQueue.length === 0) return;

        const formData = this.submissionQueue.shift();
        this.submit(formData)
            .then(result => {
                this.handleSuccess(result);
                this.processQueue();
            })
            .catch(error => {
                this.handleFailure(error);
                this.submissionQueue.unshift(formData);
                setTimeout(() => this.processQueue(), 5000);
            });
    }

    async submit(formData) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Server error');
            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    prepareFormData() {

    }

    validate(formData) {
        // Implement your validation logic
        return true;
    }

    handleSuccess(response) {
        this.submitting = false;
        // Handle success
    }

    handleFailure(error) {
        this.submitting = false;
        // Handle failure and show error to user
    }

    retryFailedSubmissions() {
        if (!this.submitting && this.submissionQueue.length > 0) {
            this.processQueue();
        }
    }
}