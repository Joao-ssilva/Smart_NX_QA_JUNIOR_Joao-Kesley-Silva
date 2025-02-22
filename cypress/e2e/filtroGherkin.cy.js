/// <reference types="cypress" />
import { employee } from '../e2e/elements/datas'

describe('Filtros de "Employee"', () => {

    context.only('Pesquisar um employe,e pelo nome', () => {
        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })

        it('Dado que o usuário está logado no OrangeHRM e acessa o módulo "PIM"', () => {
            cy.fazerLogin(employee.userName, employee.senha)
            cy.acessarModulo('PIM')
        })

        it(`E digita o nome "${employee.firstName} ${employee.middleName}" no campo de pesquisa "Employee Name"`, () => { 
            cy.contains('Employee List').should('be.visible').click()
            cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input')
                .type(`${employee.firstName} ${employee.middleName}`)
        })

        it('E clica no botão "Search"', () => {
            cy.contains('button', 'Search').click()
        })
        it(`Então o sistema deve exibir os resultados contendo o employee "${employee.firstName} ${employee.middleName}"`, () => {
            cy.get('.oxd-table-card').should('contain.text', `${employee.firstName} ${employee.middleName}`)
        })
    })

    context('Pesquisar um employee pelo ID', () => {
        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })
        const employeee = {
            name: 'Paulo',
            id: '119067'
 }

        it('Dado que o usuário está logado no OrangeHRM e acessa o módulo "PIM"', () => {

            cy.fazerLogin(employee.userName, employee.senha)
            cy.acessarModulo('PIM')
        })

        it(`Quando digita o Employee ID "${employeee.id}" no campo de pesquisa "Employee Id"`, () => {
            
            cy.contains('Employee List').should('be.visible').click()
            cy.get('.oxd-input-group')
                .filter(':has(.oxd-label:contains("Employee Id"))') 
                .find('input')
                .type(employeee.id)
        })

        it('E clica no botão "Search"', () => {
            cy.contains('button', 'Search').click()
        })
        it(`Então o sistema deve exibir o employee correspondente ao ID "${employeee.id}"`, () => {
            cy.get('.oxd-table-card').should('contain.text', `${employeee.name}`)
        })
    })

    context('Pesquisar um employee com ID inexistente', () => {
        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })

        it('Dado que o usuário está logado no OrangeHRM', () => {
            cy.fazerLogin(employee.userName, employee.senha)
            cy.acessarModulo('PIM')
        })
        
        it('E acessa a página "Employee List"', () => {
            cy.contains('Employee List').should('be.visible').click()
        })
        
        it('Quando digita o Employee ID "99999" no campo de pesquisa "Employee ID"', () => {
            cy.get('.oxd-input-group')
                .filter(':has(.oxd-label:contains("Employee Id"))')
                .find('input') 
                .clear()
                .type('99999')
        })
        
        it('E clica no botão "Search"', () => {
            cy.contains('button', 'Search').click()
        })

        it('Então o sistema deve exibir a mensagem "No Records Found"', () => {
            cy.contains('No Records Found')
                .should('be.visible')
        })
        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })
    })  

    context('Pesquisar um employee com nome inexistente', () => {
        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })
    
        const nomeInexistente = 'Nome Inexistente'
    
        it('Dado que o usuário está logado no OrangeHRM e acessa o módulo "PIM"', () => {
            cy.fazerLogin(employee.userName, employee.senha)
            cy.acessarModulo('PIM')
        })
    
        it('E está na página "Employee List"', () => {
            cy.contains('Employee List').should('be.visible').click()
        })
    
        it(`Quando digita o nome "${nomeInexistente}" no campo de pesquisa "Employee Name"`, () => {
            cy.get('.oxd-input-group')
                .filter(':has(.oxd-label:contains("Employee Name"))')
                .find('input')
                .clear()
                .type(nomeInexistente)
        })
    
        it('E clica no botão "Search"', () => {
            cy.contains('button', 'Search').click()
        })
    
        it('Então o sistema deve exibir a mensagem "No Records Found"', () => {
            cy.contains('No Records Found') 
            .should('be.visible')
        })
    })
    
})