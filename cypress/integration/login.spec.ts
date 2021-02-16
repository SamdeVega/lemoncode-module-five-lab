describe('Login specs', () => {
	it('visit the login page', () => {
		cy.visit('/');
	});

	it('should user input has the focus when it clicks on it', () => {
		cy.visit('/');
		cy.findByRole('textbox').as('userInput');
		cy.get('@userInput').click();

		cy.get('@userInput').should('have.focus');
	});

	it('should type on user and password inputs', () => {
		const user = 'admin';
		const password = '1234';
		cy.visit('/');
		cy.findByRole('textbox').as('userInput');
		cy.get('input[name="password"]').as('passwordInput');

		cy.get('@userInput').type(user);
		cy.get('@passwordInput').type(password);

		cy.get('@userInput').should('have.value', user);
		cy.get('@passwordInput').should('have.value', password);
	});

	it('should show an alert with a message when type invalid credentials', () => {
		const user = 'admin';
		const password = '1234';
		cy.visit('/');
		cy.findByRole('textbox').as('userInput');
		cy.get('input[name="password"]').as('passwordInput');
		cy.get('@userInput').type(user);
		cy.get('@passwordInput').type(password);
		cy.findByRole('button', { name: 'Login' }).click();

		cy.get('form').submit();

		cy.findByRole('alert').should('be.visible');
	});

	it('should navigate to project tracker page when type valid credentials', () => {
		const user = 'admin';
		const password = 'test';
		cy.visit('/');
		cy.findByRole('textbox').as('userInput');
		cy.get('input[name="password"]').as('passwordInput');
		cy.get('@userInput').type(user);
		cy.get('@passwordInput').type(password);
		cy.findByRole('button', { name: 'Login' }).click();

		cy.get('form').submit();

		cy.url().should('equal', 'http://localhost:8080/#/submodule-list')
	})
});
