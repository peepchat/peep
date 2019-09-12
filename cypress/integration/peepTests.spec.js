describe("Load Test", () => {
  it("Visit the website", () => {
    cy.visit("http://localhost:3000/");
  });
});

describe("Should be able to go to register page and test input", () => {
  it("Go to register page", () => {
    cy.get(".register").click();
    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/#/register");
    });
  });
  it("Should be able to type into email input", () => {
    cy.get(".email-input")
      .type("user@gmail.com")
      .should("have.value", "user@gmail.com");
  });
  it("Should be able to type into nickname input", () => {
    cy.get(".nickname-input")
      .type("User")
      .should("have.value", "User");
  });
  it("Should be able to type into password input", () => {
    cy.get(".password-input")
      .type("password")
      .should("have.value", "password");
  });
});

describe("Should go back to login page", () => {
  it("Go to login page", () => {
    cy.get(".login").click();
    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/#/");
    });
  });
});

describe("Should login when input email and password", () => {
  it("Should be able to type into login input field", () => {
    cy.get(".login-input")
      .type("user@gmail.com")
      .should("have.value", "user@gmail.com");
  });
  it("Should be able to type into password field", () => {
    cy.get(".password-input")
      .type("password")
      .should("have.value", "password");
  });
  it("Should login and switch route", () => {
    cy.get(".login-btn").click();
    cy.location().should(loc => {
      expect(loc.href).to.eq(
        "http://localhost:3000/#/peep/dm/profile/user@gmail.com"
      );
    });
    cy.wait(1000);
  });
});

describe("Should be able to go to search", () => {
  it("Should open search modal", () => {
    cy.get(".search-btn").click();
  });
  it("Should be able to type into search input", () => {
    cy.get(".search-input")
      .type("mudduh")
      .should("have.value", "mudduh");
  });
  it("Search should contain mudduh@gmail.com", () => {
    cy.get(".user-item").contains("mudduh@gmail.com");
  });
  it("Click on mudduh@gmail.com and leads to profile", () => {
    cy.get(".user-item")
      .contains("mudduh@gmail.com")
      .click();
    cy.location().should(loc => {
      expect(loc.href).to.eq(
        "http://localhost:3000/#/peep/dm/profile/mudduh@gmail.com"
      );
    });
  });
});

describe("Should go to DM with friend and should be able to type", () => {
  it("Goes to DM with Jrugz", () => {
    cy.get(".friend-btn")
      .contains("Jrugz")
      .click();
    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/#/peep/dm/32");
    });
  });
  it("Should be able to type in the chatbox", () => {
    cy.get(".chat-input")
      .type("hello")
      .should("have.value", "hello");
  });
});

describe("Logout should redirect to login page", () => {
  it("Clicking logout should return to login page", () => {
    cy.get(".logout-btn").click();
    cy.location().should(loc => {
      expect(loc.href).to.eq("http://localhost:3000/#/");
    });
  });
});
