//Event listener for submitting form and receiving feedback
const form = document.getElementById('contact-form');
const feedbackContainer = document.getElementById('form-feedback-container');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  feedbackContainer.style.display = 'none';
  feedbackContainer.classList.remove('successful-feedback', 'unsuccessful-feedback');
  feedbackContainer.innerHTML = localStorage.getItem('language') == 'de' 
                    ? 'Ihre Kontaktanfrage wird gerade gesendet, bitte warten Sie einen Moment...' 
                    : 'İletişim talebiniz gönderiliyor, lütfen bir dakika bekleyin...';
  feedbackContainer.style.display = 'block';
  
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
  })
  .then(async (response) => {
    let json = await response.json();
    if(response.status = 200) {
      feedbackContainer.innerHTML = localStorage.getItem('language') == 'de'
                        ? 'Danke für Ihre Kontaktanfrage. Ich werde mich schnellsmöglichst bei Ihnen melden.'
                        : 'Sorunuz için teşekkür ederim. En kısa sürede size geri dönüş yapacağım.';
      feedbackContainer.classList.add('successful-feedback');
    }
    else {
      console.log(response.json);
      feedbackContainer.innerHTML = localStorage.getItem('language') == 'de'
                      ? 'Leider ist ein Fehler aufgetreten. Bitte versuchen Sie, Ihre Kontaktanfrage später erneut zu senden. Vielen Dank für Ihr Verständnis!' 
                      : 'Maalesef bir hata oluştu. Lütfen iletişim talebinizi daha sonra tekrar göndermeyi deneyin. Anlayışınız için teşekkür ederiz!';
      feedbackContainer.classList.add('unsuccessful-feedback');
    }
  })
  .catch(error => {
    console.log(error);
    feedbackContainer.innerHTML = localStorage.getItem('language') == 'de'
                      ? 'Leider ist ein Fehler aufgetreten. Bitte versuchen Sie, Ihre Kontaktanfrage später erneut zu senden. Vielen Dank für Ihr Verständnis!' 
                      : 'Maalesef bir hata oluştu. Lütfen iletişim talebinizi daha sonra tekrar göndermeyi deneyin. Anlayışınız için teşekkür ederiz!';
    feedbackContainer.classList.add('unsuccessful-feedback');
  })
  .then(function() {
    form.reset();
    setTimeout(() => {
      feedbackContainer.style.display = 'none';
    }, 3000);
  })
})