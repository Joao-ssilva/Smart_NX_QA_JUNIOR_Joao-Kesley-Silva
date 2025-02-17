/// <reference types="cypress" />
import { employee } from '../e2e/elements/datas'

describe('Tela de Login', () => {
    context('Login com sucesso', () => {
        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
          })
        it('Dado que o usuário acessa a tela de login do OrangeHRM', () => {
            cy.visit('/')
            cy.title().should('eq', 'OrangeHRM')
        })

        it(`E insere um nome de usuário válido "${employee.userName}"`, () => {
            cy.get('input[placeholder="Username"]').type(employee.userName)
        })   

        it(`E insere uma senha válida "${employee.senha}"`, () => {   
            cy.get('input[placeholder="Password"]').type(employee.senha)
        })

        it('Quando clica no botão "Login"', () => {
            cy.contains('button', 'Login').click()
        })

        it('Então ele deve ser redirecionado para o painel administrativo', () => {   
            cy.contains('header', 'Dashboard')
            .should('be.visible')
        }) 
    })
    context('Login sem fornecer usuário e senha', () => {
        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
          })

        it('Dado que o usuário acessa a tela de login do OrangeHRM', () => {
            cy.visit('/')
            cy.title().should('eq', 'OrangeHRM')
        })

        it('E clica no botão de login sem inserir os dados de login', () => {
            cy.contains('button', 'Login').click()
        })

        it('Então ele deve ver uma mensagem de erro "Required"', () => {
            cy.get('.oxd-input-field-error-message')
                .should('be.visible')
                .and('contain', 'Required')
        })
    })
    context('Login com credenciais inválidas', () => {
        it('Dado que o usuário acessa a tela de login do OrangeHRM', () => {
            cy.visit('https://opensource-demo.orangehrmlive.com')
            cy.title().should('eq', 'OrangeHRM')
        })   

        it('E insere um nome de usuário inválido "usuario_invalido"', () => {    
            const user = 'usuario_invalido'
            cy.get('input[placeholder="Username"]').type(user)
        })  

        it('E insere uma senha inválida "senha_errada"', () => {    
            const senha = 'teste123'
            cy.get('input[placeholder="Password"]').type(senha)
        })

        it('Quando clica no botão "Login""', () => {    
            cy.contains('button', 'Login').click()
        })

        it('Então ele deve ver uma mensagem de erro "Invalid credentials"', () => {
            cy.get('.oxd-alert-content-text')
            .should('be.visible')
            .and('contain', 'Invalid credentials')
        })
        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })
    })
})
