const CONTACT_EMAIL = 'gintik002@gmail.com';

export async function sendContactMessage({ name, email, message }) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (accessKey) {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        message,
        subject: `Portfolio DLBJ - Message de ${name}`,
        from_name: 'Portfolio DLBJ',
        replyto: email
      })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Web3Forms request failed');
    }

    return;
  }

  const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      message,
      _subject: `Portfolio DLBJ - Message de ${name}`,
      _template: 'table',
      _captcha: 'false'
    })
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error('FormSubmit request failed');
  }
}
