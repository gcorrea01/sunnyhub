$(document).ready(function() {
    
    // Scroll on buttons    
    $( '.js--scroll-to-form' ).click( () => {
      $( 'html, body' ).animate( { scrollTop: $( '.js--section-form' ).offset().top }, 1000 )
    } )
    
    $( '.js--scroll-to-services' ).click(() => {
      $( 'html, body' ).animate( { scrollTop: $( '.js--section-services' ).offset().top }, 1000 )
    } )
    
    // Select all links with hashes, except those who doesn't link anywhere
    $('a[href*="#"]')
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function(event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
          && 
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          let target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000, function() {
              // Callback after animation
              // Must change focus!
              let $target = $(target);
              $target.focus();
              if ($target.is(":focus")) { // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              };
            });
          }
        }
      });


  // Configure form submission
  const form = document.querySelector('form');
  const formResponse = document.getElementById('js-form-response')
  const formButton = document.getElementById('form-submit-button')

  form.onsubmit = async(e) => {
    e.preventDefault()

    // Clean form UX
    formResponse.innerHTML = ''
    formResponse.classList.remove('success', 'error')
    formButton.disabled = true

    // Prepare data to send
    const data = Array.from(form).reduce((data, formElement) => {
      if (formElement.name != '') {
        data[formElement.name] = formElement.value
      }

      return data
    }, {});

    // Get the user IP
    try {
      const { ip } = await $.getJSON('https://api.ipify.org?format=jsonp&callback=?')
      data.ip = ip
    } catch (error) {
      console.error('An error ocurred', error)
    }
    
    // Log what our lambda function will receive
    console.log(JSON.stringify(data));

    // Construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action, true);
    xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // Send the collected data as JSON
    xhr.send(JSON.stringify(data));

    // Callback function
    xhr.onloadend = response => {
      if (response.target.status === 200) { // The form submission was successful
        form.reset();
        formResponse.innerHTML = 'Obrigado pelo contato! Entraremos em contato em breve.';
        formResponse.classList.add('success');
        formResponse.classList.remove('error');
      } else { // The form submission failed        
        formResponse.innerHTML = 'Ocorreu algum erro, por favor tente nos contatar manualmente através do telefone (51) 99380-6834. Nos desculpe pelo ocorrido.';
        formResponse.classList.add('error');
        formResponse.classList.remove('success');
        console.error(JSON.parse(response.target.response));
      }
      
      formButton.disabled = false
    }
  }
})