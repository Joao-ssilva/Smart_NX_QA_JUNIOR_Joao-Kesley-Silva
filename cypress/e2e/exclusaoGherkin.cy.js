/// <reference types="cypress" />
import { employee } from '../e2e/elements/datas'

describe('Exclusão de Employee no módulo PIM do OrangeHRM', () => {
    const dataEmployee = {
        firstName: 'Paulo',
        middleName: 'Victor',
        lastName: 'Silva',
        id: '119067'
    }

    context('Clicar no ícone de lixeira e cancelar a exclusão, garantindo que o employee não foi excluído', () => {
        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })
    
        it('Dado que o usuário está logado no OrangeHRM e acessa o módulo "PIM"', () => {
            cy.fazerLogin(employee.userName, employee.senha)
            cy.acessarModulo('PIM')
        })
    
        it('E está na página "Employee List"', () => {
            cy.contains('Employee List').should('be.visible').click()
        })
    
        it(`E há um employee "${dataEmployee.firstName}" cadastrado`, () => {
            cy.contains('Employee List').should('be.visible').click()
            cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input')
                .type(`${dataEmployee.firstName} ${dataEmployee.middleName}`)
            cy.contains('button', 'Search').click()
            cy.get('.oxd-table-card').should('contain.text', dataEmployee.firstName)
        })   

        it(`Quando o usuário clica no ícone de lixeira ao lado do nome do employee "${dataEmployee.firstName}"`, () => {
            cy.contains(`${dataEmployee.firstName}`) 
            cy.get('.oxd-table-cell-actions')
            .find('.oxd-icon.bi-trash')
            .click()
        })
    
        it('E seleciona a opção "Cancelar" na janela de confirmação', () => {
            cy.contains('button', 'No, Cancel').click()
        })
    
        it(`Então o sistema não deve excluir o employee "${dataEmployee.firstName}"`, () => {
            cy.get('.oxd-table-card').should('contain.text', `${dataEmployee.firstName}`)
        })
    }) 

    context('Clicar no ícone de lixeira e confirmar a exclusão', () => {
        const dataEmployeeLocal = {
            firstNameLocal: 'Toninho',
            middleNameLocal: 'Frago',
            lastNameLocal: 'Silva',
            idLocal: Math.floor(100000 + Math.random() * 900000)
        }
        const userName = 'Admin'
        const senha = 'admin123'  
        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })

        it('Dado que o usuário está logado no OrangeHRM e acessa o módulo "PIM"', () => {
            cy.fazerLogin(employee.userName, employee.senha)
            cy.acessarModulo('PIM')
        })
        
        it(`E cria um Employee "${dataEmployeeLocal.firstNameLocal} ${dataEmployeeLocal.middleNameLocal}"`, () => {
            cy.criarNovoEmployeeSemLogin(
                dataEmployeeLocal.firstNameLocal, 
                dataEmployeeLocal.middleNameLocal,
                dataEmployeeLocal.lastNameLocal,
                dataEmployeeLocal.idLocal
            )
            cy.contains('Successfully Saved')
                .should('be.visible')
            cy.wait(5000)
        })
        
        it('E volta para a página "Employee List"', () => {
            cy.contains('Employee List').click()
        })
        
        it(`Então pesquisa o employee "${dataEmployeeLocal.firstNameLocal} ${dataEmployeeLocal.middleNameLocal}" cadastrado`, () => {
            cy.get('.oxd-input-group')
                .filter(':has(.oxd-label:contains("Employee Name"))')
                .find('input')
                .type(`${dataEmployeeLocal.firstNameLocal} ${dataEmployeeLocal.middleNameLocal}`)
            cy.contains('button', 'Search').click()
        })
        
        it(`Quando o usuário clica no ícone de lixeira ao lado do nome do employee "${dataEmployeeLocal.firstNameLocal} ${dataEmployeeLocal.middleNameLocal}"`, () => {
            cy.get('.oxd-table-card')
            cy.contains(`${dataEmployeeLocal.firstNameLocal}`) 
            cy.get('.oxd-table-cell-actions')
            .find('.oxd-icon.bi-trash')
            .click()
        })
        
        it('E seleciona a opção "Yes, Delete" na janela de confirmação', () => {
            cy.contains('button', 'Yes, Delete').click()
        })
        
        it(`Então o sistema deve excluir o employee "${dataEmployeeLocal.firstNameLocal} ${dataEmployeeLocal.middleNameLocal}"`, () => {
            cy.contains(`${dataEmployeeLocal.firstNameLocal} ${dataEmployeeLocal.middleNameLocal}`).should('not.exist')
            cy.contains('Successfully Deleted')
                .should('be.visible')
        
        })
        after(() => {
            cy.clearLocalStorage()
            cy.clearCookies()
        })
    })    
})
