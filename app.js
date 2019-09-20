'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const access_token = "EAAgJQnhHQIQBAO1tbTIrCMZAIiCIYMLL7qAfulyc9knRPZCk3ziq0gomIl2gVTjx6IpQh3kQ0mYjejdDOM8e9J5bauqjut1IUECk69XjzfPV0QxjAcbT2WzfjOxqQUGaZCrlBcpqL0GwhRy1snoZBX18T1YgwZC2ybDRYnAFxNAZDZD";

const app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());

app.get('/', function(req, response){
    response.send('Hola Mundo valpublicidad!');
})

app.get('/webhook', function(req, response){
    if(req.query['hub.verify_token'] === 'valpublicidad_token'){
        response.send(req.query['hub.challenge']);
    } else {
        response.send('valpublicidad no tienes permisos.')
    }
})



app.post('/webhook/', function(req, res){
    const webhook_event = req.body.entry[0];
    if(webhook_event.messaging) {
        webhook_event.messaging.forEach(event => {
            handleEvent(event.sender.id, event);
        });
    }
    res.sendStatus(200);
});

function handleEvent(senderId, event) {
    if (event.message) {
        if (event.message.quick_reply) {
            handlePostback(senderId, event.message.quick_reply.payload);
        } else {
            handleMessage(senderId, event.message);
        }
    }
    else if (event.postback) {
        handlePostback(senderId, event.postback.payload);
    }
}


function handleMessage(senderId, event){
    if(event.text){
       //defaultMessage(senderId)
    } else if (event.attachments) {
        handleAttachments(senderId, event)
    }
}

function defaultMenu(senderId) {
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message": {
            "text": "Gracias, te doy la bienvenida, soy un robot que te re direccionará a la información o acción que desees realizar. Me puedes apoyar en seleccionar uno de los siguientes elementos.",
          
            "quick_replies": [
                {
                    "content_type": "text",
                    "title": "COFEPRIS",
                    "payload": "MENU_COFEPRIS_PAYLOAD"
                },
                {
                    "content_type": "text",
                    "title": "Google Ads",
                    "payload": "MENU_GOOGLE_ADS_PAYLOAD"
                },
                {
                    "content_type": "text",
                    "title": "Admin Facebook",
                    "payload": "MENU_FACEBOOK_PAYLOAD"
                },
                {
                    "content_type": "text",
                    "title": "Páginas Web",
                    "payload": "MENU_PAGINAS_PAYLOAD"
                },
                {
                    "content_type": "text",
                    "title": "Expedientes clínicos",
                    "payload": "MENU_EXPEDIENTES_PAYLOAD"
                },
                {
                    "content_type": "text",
                    "title": "Diseño grafico",
                    "payload": "MENU_GRAFICO_PAYLOAD"
                }

            ]

         
        }
        
    }
    senderActions(senderId)
    callSendApi(messageData);
}

function grafico(senderId)
{
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message":{
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"button",
              "text":"Contamos con un equipo especializado para crear diseños innovadores para todas las plataformas que administres",
              "buttons":[
                {
                    "type": "postback",
                    "title": "Cotizar ahora",
                    "payload": "COTIZAR_GRAFICO_PAYLOAD"
                }
              ]
            }
          }
        }
             
    }
    senderActions(senderId)
    callSendApi(messageData);
}

function ventajasExpediente(senderId)
{
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message":{
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"button",
              "text":"Agenda citas, administra pacientes, historias clínicas, recetas, y todo relativo y exclusivo a tu especialidad, hacemos el desarrollo desde cero.",
              "buttons":[
                {
                    "type": "postback",
                    "title": "Cotizar ahora",
                    "payload": "COTIZAR_EXPEDIENTE_PAYLOAD"
                }
              ]
            }
          }
        }
             
    }
    senderActions(senderId)
    callSendApi(messageData);
}
function expedientes(senderId)
{
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message":{
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"button",
              "text":"Creamos un expediente clínico electrónico a la medida de tus necesidades, la vinculamos hacia tu página web personalizada.",
              "buttons":[
                {
                    "type": "postback",
                    "title": "Ventajas",
                    "payload": "VENTAJAS_EXPEDIENTE_PAYLOAD"
                }
              ]
            }
          }
        }
             
    }
    senderActions(senderId)
    callSendApi(messageData);
}

function paginasWeb(senderId)
{
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message":{
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"button",
              "text":"Creamos tú página web profesional e inteligente a la medida de tus servicios.",
              "buttons":[
                {
                    "type": "postback",
                    "title": "Cotizar ahora",
                    "payload": "COTIZAR_PAGINA_PAYLOAD"
                }
              ]
            }
          }
        }
             
    }
    senderActions(senderId)
    callSendApi(messageData);
}
function adminFacebook(senderId)
{
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message":{
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"button",
              "text":"Administramos el contenido de tú página de Facebook, creamos publicaciones, diseñamos la mejor estrategia para construir una comunidad alrededor de tus servicios.",
              "buttons":[
                {
                    "type": "postback",
                    "title": "Cotizar ahora",
                    "payload": "COTIZAR_FACEBOOK_PAYLOAD"
                }
              ]
            }
          }
        }
             
    }
    senderActions(senderId)
    callSendApi(messageData);
}

function cotizarGoogle(senderId)
{
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message": {
            "text": "Podrías indicarnos por favor tu especialidad.", 
        }
        
    }
    senderActions(senderId);
    callSendApi(messageData);
}
function desventajas(senderId)
{
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message": {
            "text": "Al pagar mes a mes a un directorio médico, tú pagas para posicionar a éste, y a la vez el directorio te posiciona a ti dentro de su plataforma, mejor invierte ese dinero en tu propia imagen, te garantizamos que invertirás menos y con mejores resultados.", 
        }
        
    }
    senderActions(senderId);
    callSendApi(messageData);
}
function googleAdsMenu(senderId)
{
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message":{
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"button",
              "text":"Te has fijado que cuando alguien busca algún servicio médico en Google, primeramente muestran los médicos o empresas que pagan por aparecer en el top 4 de resultados, esto lo podemos hacer con tus servicios y tener más probabilidades de ser contactado.",
              "buttons":[
                {
                    "type": "postback",
                    "title": "Desventaja directorio",
                    "payload": "DESVENTAJA_DIRECTORIO_PAYLOAD"
                },
                {
                    "type": "postback",
                    "title": "Cotizar proyecto",
                    "payload": "COTIZAR_GOOGLEADS_PAYLOAD"
                }
              ]
            }
          }
        }
             
    }
    senderActions(senderId)
    callSendApi(messageData);
}

function cofeprisMenu(senderId){
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message": {
            "text": "¿Sabías que para poder publicitarte en Facebook, Instagram y páginas web necesitas una autorización por parte de la COFEPRIS?",
          
            "quick_replies": [
                {
                    "content_type": "text",
                    "title": "Tengo advertencia",
                    "payload": "ADVERTENCIA_PAYLOAD"
                },
                {
                    "content_type": "text",
                    "title": "Ley que lo avala",
                    "payload": "LEY_GENERAL_PAYLOAD"
                },
                {
                    "content_type": "text",
                    "title": "¿Para quién es?",
                    "payload": "PARA_QUIENES_PAYLOAD"
                },
                {
                    "content_type": "text",
                    "title": "¿Por qué solicitarla?",
                    "payload": "SOLICITARLA_PAYLOAD"
                },
                {
                    "content_type": "text",
                    "title": "Cotizar servicio",
                    "payload": "COTIZAR_PAYLOAD"
                },
                {
                    "content_type": "text",
                    "title": "Chatear con alguien",
                    "payload": "SUPPORT_PAYLOAD"
                }

            ]

         
        }
        
    }
    senderActions(senderId);
    callSendApi(messageData);
}

function resultadoSubmenuCotizarServicio(senderId)
{
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message": {
            "text": "Listo, nos puedes indicar el nombre de la página o link a someter, y el correo  o número de whatsapp para enviarle la cotización.",
         
        }
        
    }
    senderActions(senderId)
    callSendApi(messageData);
}

function menuCotizarServicio(senderId)
{
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message": {
            "text": "Deseo trámitar mi autorización publicitaria, soy:",
            "quick_replies": [
                {
                    "content_type": "text",
                    "title": "Profesional salud",
                    "payload": "SUBMENU_SERVICIO_PAYLOAD"
                },
                {
                    "content_type": "text",
                    "title": "Clínica",
                    "payload": "SUBMENU_SERVICIO_PAYLOAD"
                },
                {
                    "content_type": "text",
                    "title": "Centro médico",
                    "payload": "SUBMENU_SERVICIO_PAYLOAD"
                },
                {
                    "content_type": "text",
                    "title": "Laboratorio",
                    "payload": "SUBMENU_SERVICIO_PAYLOAD"
                },
                {
                    "content_type": "text",
                    "title": "Chatear con alguien",
                    "payload": "SUBMENU_SERVICIO_PAYLOAD"
                }

            ]

         
        }
        
    }
    senderActions(senderId)
    callSendApi(messageData);
}

function subMenuServicio(senderId)
{
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message": {
            "text": "Perfecto, nos podrías indicar que plataforma digital deseas someter.",
            "quick_replies": [
                {
                    "content_type": "text",
                    "title": "Facebook",
                    "payload": "RESULTADO_SUBMENU_COTIZAR_PAYLOAD"
                },
                {
                    "content_type": "text",
                    "title": "Instagram",
                    "payload": "RESULTADO_SUBMENU_COTIZAR_PAYLOAD"
                },
                {
                    "content_type": "text",
                    "title": "Página Web",
                    "payload": "RESULTADO_SUBMENU_COTIZAR_PAYLOAD"
                },
                {
                    "content_type": "text",
                    "title": "Más de 1",
                    "payload": "RESULTADO_SUBMENU_COTIZAR_PAYLOAD"
                }
            ]

         
        }
        
    }
    senderActions(senderId)
    callSendApi(messageData);

}

function cotizarServicio(senderId)
{
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message":{
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"button",
              "text":"Para realizar una cotización exacta, nos ayudaría mucho si nos proporcionaras la siguiente información, estos datos no serán compartidos con nadie, salvo nuestros colaboradores, si deseas conocer el tratamiento de los datos que nos proporcionas por favor  ingresar a nuestro aviso de privacidad.",
              "buttons":[
                {
                    "type":"web_url",
                    "url":"https://valpublicidad.com/aviso-privacidad.html",
                    "title":"Aviso de privacidad"
                },
                {
                    "type": "postback",
                    "title": "Continuar cotización",
                    "payload": "CONTINUAR_COTIZACION_PAYLOAD"
                }
              ]
            }
          }
        }
             
    }
    senderActions(senderId)
    callSendApi(messageData);
}
function solicitarla(senderId)
{
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message":{
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"button",
              "text":"Seleccione una opción, por qué solicitar una autorización a mi publicidad.",
              "buttons":[
                {
                    "type": "postback",
                    "title": "Multas",
                    "payload": "MULTAS_PAYLOAD"
                },
                {
                    "type": "postback",
                    "title": "Confianza profesional",
                    "payload": "CONFIANZA_PAYLOAD"
                }
              ]
            }
          }
        }
             
    }
    senderActions(senderId)
    callSendApi(messageData);
}
 function multas(senderId)
 {
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message":{
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"button",
              "text":"La autoridad sanitaria impondrá una multa de hasta 16000 veces el salario mínimo, de conformidad con los artículos 416 y 422 de la Ley General de Salud.",
              "buttons":[
                {
                    "type": "postback",
                    "title": "Cotizar servicio",
                    "payload": "COTIZAR_PAYLOAD"
                },
                {
                    "type": "postback",
                    "title": "Ir a servicios",
                    "payload": "SERVICIOS_PAYLOAD"
                }
              ]
            }
          }
        }
             
    }
    senderActions(senderId)
    callSendApi(messageData);
 }
 function confianza(senderId)
 {
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message":{
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"button",
              "text":"Las publicaciones con imágenes que contienen un número de autorización son mejor percibidas por los usuarios que visitan una página de Facebook, Instagram o Web, crean confianza y hay mayor probabilidad de tener una interacción.",
              "buttons":[
                {
                    "type": "postback",
                    "title": "Cotizar servicio",
                    "payload": "COTIZAR_PAYLOAD"
                },
                {
                    "type": "postback",
                    "title": "Ir a servicios",
                    "payload": "SERVICIOS_PAYLOAD"
                }
              ]
            }
          }
        }
             
    }
    senderActions(senderId)
    callSendApi(messageData);
 }
function paraQuienes(senderId){

    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message":{
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"button",
              "text":"Todos aquellos que prestan servicios de salud, actividades profesionales, técnicas, auxiliares y las especialidades a que se refiere el Capítulo I del Título Cuarto de la Ley.",
              "buttons":[
                {
                    "type": "postback",
                    "title": "Cotizar servicio",
                    "payload": "COTIZAR_PAYLOAD"
                },
                {
                    "type": "postback",
                    "title": "Ir a servicios",
                    "payload": "SERVICIOS_PAYLOAD"
                }
              ]
            }
          }
        }
             
    }
    senderActions(senderId)
    callSendApi(messageData);
}

function leyGeneral(senderId){
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message":{
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"button",
              "text":"Reglamento de la Ley General de Salud en Materia de Publicidad.",
              "buttons":[
                {
                    "type":"web_url",
                    "url":"http://www.diputados.gob.mx/LeyesBiblio/regley/Reg_LGS_MP.pdf",
                    "title":"Ver ley"
                },
                {
                    "type": "postback",
                    "title": "Cotizar servicio",
                    "payload": "COTIZAR_PAYLOAD"
                },
                {
                    "type": "postback",
                    "title": "Ir a servicios",
                    "payload": "SERVICIOS_PAYLOAD"
                }
              ]
            }
          }
        }
             
    }
    senderActions(senderId)
    callSendApi(messageData);
}

function advertenciaPregunta(senderId)
{
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message": {
            "text": "¿Ya la contestaste?",
          
            "quick_replies": [
                {
                    "content_type": "text",
                    "title": "Si",
                    "payload": "SI_ADVERTENCIA_PAYLOAD"
                },
                {
                    "content_type": "text",
                    "title": "No",
                    "payload": "NO_ADVERTENCIA_PAYLOAD"
                }

            ]

         
        }
        
    }
    senderActions(senderId)
    callSendApi(messageData);
}
  function advertenciaSi(senderId)
  {
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message":{
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"button",
              "text":"Recuerda dar atención y seguimiento.",
              "buttons":[
                {
                    "type": "postback",
                    "title": "Ir a servicios",
                    "payload": "SERVICIOS_PAYLOAD"
                }
              ]
            }
          }
        }
             
    }
    senderActions(senderId)
    callSendApi(messageData);

  }
  function advertenciaNo(senderId)
  {
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message":{
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"button",
              "text":"Nosotros te podemos apoyar en realizar la contestación y seguimiento.",
              "buttons":[
                {
                    "type": "postback",
                    "title": "Ir a servicios",
                    "payload": "SERVICIOS_PAYLOAD"
                }
              ]
            }
          }
        }
             
    }
    senderActions(senderId)
    callSendApi(messageData);
  }


function senderActions(senderId) {
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "sender_action": "typing_on"
    }
    callSendApi(messageData);
}

function handlePostback(senderId, payload){
    console.log(payload)
    switch (payload) {
        case "GET_STARTED_VALPUBLICIDAD":
            senderActions(senderId);
            //messageImage(senderId);
            defaultMenu(senderId);
            
        break;
        case "SERVICIOS_PAYLOAD":
            senderActions(senderId);
            showServices(senderId);
        break;
        case "CONTACTO_PAYLOAD":
                senderActions(senderId);
            showContact(senderId);
        break;
        case "SUPPORT_PAYLOAD":
                senderActions(senderId);
            contactSuppport(senderId);
        break;
        case "MENU_COFEPRIS_PAYLOAD":
                senderActions(senderId);
             cofeprisMenu(senderId);
        break;
        case  "ADVERTENCIA_PAYLOAD":
            senderActions(senderId);
            advertenciaPregunta(senderId);
            break;
        case "SI_ADVERTENCIA_PAYLOAD":
            senderActions(senderId);
            advertenciaSi(senderId);
            break;
        case "NO_ADVERTENCIA_PAYLOAD":
            senderActions(senderId);
            advertenciaNo(senderId);
            break;
        case "LEY_GENERAL_PAYLOAD":
            senderActions(senderId);
            leyGeneral(senderId);
            break;
        case "PARA_QUIENES_PAYLOAD":
            senderActions(senderId);
            paraQuienes(senderId);
            break;
        case "SOLICITARLA_PAYLOAD":
            senderActions(senderId);
            solicitarla(senderId);
            break;
        case "MULTAS_PAYLOAD":
            senderActions(senderId);
            multas(senderId);
            break;
        case "CONFIANZA_PAYLOAD":
            senderActions(senderId);
            confianza(senderId);
            break;
        case "COTIZAR_PAYLOAD":
            senderActions(senderId);
            cotizarServicio(senderId);
            break;
        case "CONTINUAR_COTIZACION_PAYLOAD":
            senderActions(senderId);
            menuCotizarServicio(senderId);
            break;
        case "SUBMENU_SERVICIO_PAYLOAD":
            senderActions(senderId);
                subMenuServicio(senderId);
            break;
        case "RESULTADO_SUBMENU_COTIZAR_PAYLOAD":
            senderActions(senderId);
            resultadoSubmenuCotizarServicio(senderId);
            break;
        case "MENU_GOOGLE_ADS_PAYLOAD":
            senderActions(senderId);
            googleAdsMenu(senderId);
            break;
        case "DESVENTAJA_DIRECTORIO_PAYLOAD":
            senderActions(senderId);
            desventajas(senderId);
            break;
        case "COTIZAR_GOOGLEADS_PAYLOAD":
            senderActions(senderId);
            cotizarGoogle(senderId);
            break;
        case "MENU_FACEBOOK_PAYLOAD":
            senderActions(senderId);
            adminFacebook(senderId);
            break;
        case "MENU_PAGINAS_PAYLOAD":
            senderActions(senderId);
            paginasWeb(senderId);
            break;
        case "MENU_EXPEDIENTES_PAYLOAD":
            senderActions(senderId);
            expedientes(senderId);
            break;
        case "VENTAJAS_EXPEDIENTE_PAYLOAD":
            senderActions(senderId);
            ventajasExpediente(senderId);
            break;
        case "MENU_GRAFICO_PAYLOAD":
            senderActions(senderId);
            grafico(senderId);
            break;




        
    }
}


function handleAttachments(senderId, event){
    let attachment_type = event.attachments[0].type;
    switch (attachment_type) {
        case "image":
            console.log(attachment_type);
            MessageImage(senderId);
        break;
        case "video": 
            console.log(attachment_type);
        break;
        case "audio":
            console.log(attachment_type);
        break;
      case "file":
            console.log(attachment_type);
        break;
      default:
            console.log(attachment_type);
        break;
    }
}


function showServices(senderId) {
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message": {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": "Cofepris",
                            "subtitle": "Avisos y permisos de publicidad",
                            "image_url": "https://valpublicidad.com/images/menu-avisos.jpg",
                            "buttons": [
                                {
                                    "type": "web_url",
                                    "title": "Seleccionar",
                                    "url": "https://valpublicidad.com/services-cofepris.html",
                                    "webview_height_ratio": "full",
                                }
                            ]
                                
                        },
                        {
                            "title": "Publicidad",
                            "subtitle": "Proyectos de publicidad",
                            "image_url": "https://valpublicidad.com/images/menu-proyectospublicidad.jpg",
                            "buttons": [
                                {
                                    "type": "web_url",
                                    "title": "Seleccionar",
                                    "url": "https://valpublicidad.com/services-redes.html",
                                    "webview_height_ratio": "full",
                                }
                            ]
                        },
                        {
                            "title": "Publicidad google",
                            "subtitle" : "Posicionamiento google",
                            "image_url" : "https://valpublicidad.com/images/menu-publicidadgoogle.jpg",
                            "buttons" : [
                                {
                                    "type" : "web_url",
                                    "title" : "Seleccionar",
                                    "url" : "https://valpublicidad.com/services-google.html",
                                    "webview_height_ratio": "full",
                                }
                            ]
                        },
                        {
                            "title": "Desarrollo de paginas",
                            "subtitle" : "Programacion web",
                            "image_url" : "https://valpublicidad.com/images/menu-desarrollo.jpg",
                            "buttons" : [
                                {
                                    "type" : "web_url",
                                    "title" : "Seleccionar",
                                    "url" : "https://valpublicidad.com/services-desarrollo.html",
                                    "webview_height_ratio": "full",
                                }
                            ]
                        },
                        {
                            "title": "Publicidad exterior",
                            "subtitle" : "Publicidad exterior",
                            "image_url" : "https://valpublicidad.com/images/menu-publicidadexterior.jpg",
                            "buttons" : [
                                {
                                    "type" : "web_url",
                                    "title" : "Seleccionar",
                                    "url" : "https://valpublicidad.com/services-exterior.html",
                                    "webview_height_ratio": "full",
                                }
                            ]
                        },
                        {
                            "title": "Diseño grafico",
                            "subtitle" : "Diseño grafico",
                            "image_url" : "https://valpublicidad.com/images/menu-grafico.jpg",
                            "buttons" : [
                                {
                                    "type" : "web_url",
                                    "title" : "Seleccionar",
                                    "url" : "https://valpublicidad.com/services-grafico.html",
                                    "webview_height_ratio": "full",
                                }
                            ]
                        }
                        
                    ]
                }
            }
        }
    }
    senderActions(senderId);
    callSendApi(messageData);
}

function contactSuppport(senderId) {
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message": {
            "text": "Gracias, en breve te atenderemos comunicando con el canal de soporte.", 
        }
        
    }
    senderActions(senderId);
    callSendApi(messageData);
}


function showContact(senderId) {
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message": {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": "Medicos",
                            "subtitle": "Profesionales de la salud",
                            "image_url": "https://valpublicidad.com/images/slide-doctor5.jpg",
                            "buttons": [
                                {
                                    "type": "web_url",
                                    "title": "Registrarme",
                                    "url": "https://valpublicidad.com/contact-medicos.html",
                                    "webview_height_ratio": "full",
                                }
                            ]
                                
                        },
                        {
                            "title": "Empresas",
                            "subtitle": "Servicios para empresas de salud",
                            "image_url": "https://valpublicidad.com/images/slide-doctor5.jpg",
                            "buttons": [
                                {
                                    "type": "web_url",
                                    "title": "Registrarme",
                                    "url": "https://valpublicidad.com/contact-empresas.html",
                                    "webview_height_ratio": "full",
                                }
                            ]
                        }
                        
                    ]
                }
            }
        }
    }
    senderActions(senderId);
    callSendApi(messageData);
}


function messageImage(senderId) {
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message": {
            "attachment": {
                "type": "image",
                "payload": {
                    "url": "https://media.giphy.com/media/20NLMBm0BkUOwNljwv/giphy.gif"
                }
            }
        }
    }
    
    callSendApi(messageData);
}

function callSendApi(response) {
    request({
        "uri": "https://graph.facebook.com/me/messages",
        "qs": {
            "access_token": access_token
        },
        "method": "POST",
        "json": response
    },
    function(err) {
        if(err) {
            console.log('Ha ocurrido un error')
        } else {
            console.log('Mensaje enviado')
        }
    }
)
}





app.listen(app.get('port'), function(){
    console.log('Nuestro servidor esta funcionando en el puerto', app.get('port'));
})


