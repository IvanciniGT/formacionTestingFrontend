require('cypress-xpath'); // Para poder usar XPATH

describe('Login Test Suite', () => {

    const USUARIO_CORRECTO = "John Doe"
    const CONTRASENA_CORRECTA = "ThisIsNotAPassword"
    const URL_LOGIN = "https://katalon-demo-cura.herokuapp.com/profile.php#login"
    const URL_LOGIN_NO_EXITOSO = "https://katalon-demo-cura.herokuapp.com/profile.php#login"
    const URL_LOGIN_EXITOSO = "https://katalon-demo-cura.herokuapp.com/#appointment"
    const MENSAJE_ERROR_LOGIN = "Login failed! Please ensure the username and password are valid."

    const ID_CAMPO_USUARIO = "txt-username"
    const ID_CAMPO_CONTRASENA = "txt-password"
    const ID_BOTON_LOGIN = "btn-login"
    const SELECTOR_MENSAJE_ERROR = "p.lead.text-danger"
    const XPATH_MENSAJE_ERROR = "//p[contains(text(), '" + MENSAJE_ERROR_LOGIN + "')]"


  it('Login exitoso con credenciales correctas', () => {
    // Dado
    cy.visit(URL_LOGIN)
    // Meto en el formulario de login el usuario en el input cuyo id es "usuario"
    cy.get('#' + ID_CAMPO_USUARIO).type(USUARIO_CORRECTO);
    // Meto en el formulario de login la contraseña en el input cuyo id es "password"
    cy.get('#' + ID_CAMPO_CONTRASENA).type(CONTRASENA_CORRECTA);
    // Hacer click en el botón de login
    cy.screenshot('antes_login_exitoso');
    // Cuando hago click en el botón de login
    cy.get('#' + ID_BOTON_LOGIN).click();
    // Entonces la URL debe ser la de login exitoso y no debe mostrarse el mensaje de error
    cy.url().should('eq', URL_LOGIN_EXITOSO);
    cy.get(SELECTOR_MENSAJE_ERROR).should('not.exist');
    cy.screenshot('despues_login_exitoso');
  })

  it('Login no exitoso sin rellenar credenciales', () => {
    // Dado
    cy.visit(URL_LOGIN)
    // Hacer click en el botón de login
    cy.screenshot('antes_login_exitoso');
    // Cuando hago click en el botón de login
    cy.get('#' + ID_BOTON_LOGIN).click();
    // Entonces la URL debe ser la de login exitoso y no debe mostrarse el mensaje de error
    cy.url().should('eq', URL_LOGIN_NO_EXITOSO);
    cy.xpath(XPATH_MENSAJE_ERROR).should('be.visible');
    cy.screenshot('despues_login_exitoso');
  })

  it('Login no exitoso por no rellenar nombre de usuario', () => {
    // Dado
    cy.visit(URL_LOGIN)
    // Relleno solo la contraseña
    cy.get('#' + ID_CAMPO_CONTRASENA).type(CONTRASENA_CORRECTA);
    cy.screenshot('antes_login_no_exitoso_usuario_vacio');
    // Cuando hago click en el botón de login
    cy.get('#' + ID_BOTON_LOGIN).click();
    // Entonces la URL debe ser la de login no exitoso y debe mostrarse el mensaje de error
    cy.url().should('eq', URL_LOGIN_NO_EXITOSO);
    cy.xpath(XPATH_MENSAJE_ERROR).should('be.visible');
    cy.screenshot('despues_login_no_exitoso_usuario_vacio');
  } )

  it('Login no exitoso por no rellenar contraseña', () => {
    // Dado
    cy.visit(URL_LOGIN)
    cy.get('#' + ID_CAMPO_USUARIO).type(USUARIO_CORRECTO);
    cy.screenshot('antes_login_no_exitoso_usuario_vacio');
    // Cuando hago click en el botón de login
    cy.get('#' + ID_BOTON_LOGIN).click();
    // Entonces la URL debe ser la de login no exitoso y debe mostrarse el mensaje de error
    cy.url().should('eq', URL_LOGIN_NO_EXITOSO);
    cy.xpath(XPATH_MENSAJE_ERROR).should('be.visible');
    cy.screenshot('despues_login_no_exitoso_usuario_vacio');
  } )

  it('Login no exitoso por rellenar contraseña incorrecta', () => {
    // Dado
    cy.visit(URL_LOGIN)
    cy.get('#' + ID_CAMPO_USUARIO).type(USUARIO_CORRECTO);
    cy.get('#' + ID_CAMPO_CONTRASENA).type(CONTRASENA_CORRECTA + "X");

    cy.screenshot('antes_login_no_exitoso_usuario_vacio');
    // Cuando hago click en el botón de login
    cy.get('#' + ID_BOTON_LOGIN).click();
    // Entonces la URL debe ser la de login no exitoso y debe mostrarse el mensaje de error
    cy.url().should('eq', URL_LOGIN_NO_EXITOSO);
    cy.xpath(XPATH_MENSAJE_ERROR).should('be.visible');
    cy.screenshot('despues_login_no_exitoso_usuario_vacio');
  } )

  it('Login no exitoso por rellenar usuario incorrecto', () => {
    // Dado
    cy.visit(URL_LOGIN)
    // Relleno solo la contraseña
    cy.get('#' + ID_CAMPO_USUARIO).type(USUARIO_CORRECTO + "X");
    cy.get('#' + ID_CAMPO_CONTRASENA).type(CONTRASENA_CORRECTA);
    cy.screenshot('antes_login_no_exitoso_usuario_vacio');
    // Cuando hago click en el botón de login
    cy.get('#' + ID_BOTON_LOGIN).click();
    // Entonces la URL debe ser la de login no exitoso y debe mostrarse el mensaje de error
    cy.url().should('eq', URL_LOGIN_NO_EXITOSO);
    cy.xpath(XPATH_MENSAJE_ERROR).should('be.visible');
    cy.screenshot('despues_login_no_exitoso_usuario_vacio');
  } )

})