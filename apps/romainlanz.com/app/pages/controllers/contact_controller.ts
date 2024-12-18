import mail from '@adonisjs/mail/services/main';
import vine from '@vinejs/vine';
import type { HttpContext } from '@adonisjs/core/http';

export default class ContactController {
	static validator = vine.compile(
		vine.object({
			name: vine.string().trim(),
			email: vine.string().email(),
			message: vine.string().trim(),
		})
	);

	render({ inertia }: HttpContext) {
		return inertia.render('contact');
	}

	async execute({ session, request, response }: HttpContext) {
		const payload = await request.validateUsing(ContactController.validator);

		await mail.sendLater((message) => {
			message
				.from('no-reply@romainlanz.com')
				.to('hello@romainlanz.com')
				.replyTo(payload.email, payload.name)
				.subject('Nouveau message depuis formulaire de contact')
				.html(
					`Nom: ${payload.name}<br>Email: ${payload.email}<br>Message:<br>${payload.message.replaceAll('\n', '<br>')}`
				);
		});

		session.flash('success', 'Votre message a bien été envoyé !');

		return response.redirect().back();
	}
}
