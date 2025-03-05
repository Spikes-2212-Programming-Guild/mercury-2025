import {apiUrl, COLORS} from "./Config.js";
import {getFromLocalStorage, setToLocalStorage} from "./DataManager.js";

export class SubmissionHandler {

    initialize(questionManager, pageManager) {
        this.questionManager = questionManager;
        this.pageManager = pageManager;
        this.submissionQueue = JSON.parse(getFromLocalStorage('submissionQueue')) || [];
        this.submitting = false;
        setInterval(() => this.processQueue(), 1000 * 60 * 4);
    }

    createResendButton() {
        const resendButton = document.createElement('button');
        resendButton.id = 'resend_button';
        resendButton.textContent = 'Resend Unsaved Data';
        resendButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.processQueue();
            alert('Resending Unsaved Data');
        });
        return resendButton;
    }

    createSubmitButton() {
        const submitButton = document.createElement('button');
        submitButton.id = 'submit_button';
        submitButton.innerText = 'Submit';
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.submit();
        });
        return submitButton;
    }

    prepareFormData() {
        const formData = {};
        for (const question of this.questionManager.questions) {
            formData[question.id] = question.value;
        }
        return formData;
    }

    validate() {
        for (const question of this.questionManager.questions) {
            question.updateOutlineColor();
            if (!question.isValid()) {
                question.outlineColor = COLORS.WARNING;
                this.pageManager.navigateTo(question.pageIndex, false);
                const rect = question.boundingRect;
                const absoluteY = window.scrollY + rect.top - window.innerHeight / 2 + rect.height / 2;
                window.scrollTo({top: absoluteY, behavior: "smooth"});
                return false;
            }
        }
        return true;
    }

    async submit() {
        if (!this.validate()) return;
        const formData = this.prepareFormData();
        this.submissionQueue.push(formData);

        this.pageManager.navigateToFirstPage();
        this.questionManager.clearAllAnswers();
        alert('Form Successfully Submitted!');

        setToLocalStorage('submissionQueue', JSON.stringify(this.submissionQueue));
        await this.processQueue();
    }

    async processQueue() {
        if (this.submitting) {
            console.log('Already submitting');
            return;
        }
        this.submitting = true;

        while (this.submissionQueue.length > 0) {
            const formData = this.submissionQueue.shift();
            console.log("Submitting:", formData);

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    this.handleSuccess(formData);
                }
            } catch (error) {
                this.submissionQueue.unshift(formData); // Re-add failed submission
                this.handleFailure(error);
                break; // Stop further submissions for now
            }

            setToLocalStorage('submissionQueue', JSON.stringify(this.submissionQueue));
        }

        if (this.submissionQueue.length === 0) console.log('sent all submission queue');
        this.submitting = false;
    }

    handleSuccess(formData) {
        console.log('Successfully submitted ', formData);
        console.log('Submission queue length: ', this.submissionQueue.length);
    }

    handleFailure(error) {
        console.error("Submission failed:", error);
        console.log('Will try again soon')
        console.log('Submission queue length: ', this.submissionQueue.length);
    }
}
