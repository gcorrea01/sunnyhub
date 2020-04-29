const AWS = require('aws-sdk');
const SES = new AWS.SES();

const validateIp = ip => {
  return true
}

const sendEmail = async(formData) => {
  const emailParams = {
    Source: 'gcorrea@sunnyhub.com.br',
    ReplyToAddresses: [formData.email],
    Destination: {
      ToAddresses: ['gcorrea@sunnyhub.com.br'],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `Você recebeu uma novamensagem em sunnyhub.com.br!<br/><br/> <b>Nome:</b> ${formData.name}<br/><b>Email</b>: ${formData.email}<br/> <b>Casa ou Apartamento?</b> ${formData.casaOuApartamento}<br/> <b>Cidade:</b> ${formData.cidade}<br/> <b>Telefone:</b> ${formData.telefone}<br/> <b>Consumo Mensal:</b> ${formData.consumoMensal}<br/> <b>Quer receber ligação técnica?</b> ${formData.call === 'on' ? 'Sim': 'Não'}<br/><br/><br/> <b>Mensagem:</b> <br/><br/>${formData.mensagem}<br/>`,
        },
        Text: {
          Charset: 'UTF-8',
          Data: `Você recebeu uma novamensagem em sunnyhub.com.br!\n\n Nome: ${formData.name}\nEmail: ${formData.email}\n   asa ou Apartamento? ${formData.casOuApartamento}\n Cidade: ${formData.cidade}\n Telefone: ${formData.telefone}\n Consumo Mensal: ${formData.consumoMensal}\n Quer receber ligação técnica? ${formData.call === 'on' ? 'Sim': 'Não'}\n\n\n Mensagem: \n${formData.message}\n\n`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Novo Contato recebido em sunnyhub.com.br',
      },
    },
  };

  return new Promise((resolve, reject) => {
    SES.sendEmail(emailParams, function(err, data) {
      const response = {
        statusCode: err ? 500 : 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          message: err ? err.message : data,
        }),
      };

      if (err) {
        console.error('There was an error while sending the email', err, response)
      }
    
      // We will always resolve, because the request status/response is already handled
      resolve(response)
    });
  })
  
}


module.exports.proxyContactForm = async event => {
  const parsedBody = JSON.parse(event.body)
  console.log('Received data', parsedBody)

  // TODO: Validate IP with a Dynamo table
  const { ip } = parsedBody
  if (ip) {
    validateIp(ip)
  }

  const response = await sendEmail(parsedBody)

  return response
}
