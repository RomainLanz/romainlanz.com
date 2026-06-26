import vine, { SimpleMessagesProvider } from '@vinejs/vine';

vine.messagesProvider = new SimpleMessagesProvider({
	required: 'Le champ {{ field }} est obligatoire',
	email: 'Le champ {{ field }} doit être une adresse email valide',
	'color.in': 'Cette couleur n’est pas disponible.',
});
