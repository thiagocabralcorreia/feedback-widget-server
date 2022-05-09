import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";
interface SubmitFeedbackUseCaseRequest {
  type: string;
  screenshot?: string;
  comment: string;
}
export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute({ type, screenshot, comment }: SubmitFeedbackUseCaseRequest) {
    if (!type) {
      throw new Error('Feedback type must be provided.');
    }

    if (!comment) {
      throw new Error('Feedback comment must be provided.');
    }

    await this.feedbacksRepository.create({
      type,
      screenshot,
      comment,
    })

    await this.mailAdapter.sendMail({
        subject: 'New Feedback',
        body: [
            `<div style='font-family: sans-serif; font-size: 16px; color: #111;'>`,
            `<p>Feedback type ${type}</p>`,
            `<p>Comment ${comment}</p>`,
            screenshot ? `<img src='${screenshot}'/>` : ``,
            `</div>`
        ].join('\n')
    })
    }
}