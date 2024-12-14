export default {
  home: {
    url: 'home'
  },
  notFound: {
    url: 'not-found'
  },
  forbidden: {
    url: "forbidden"
  },
  error: {
    url: 'error'
  },
  login: {
    url: 'auth/login'
  },
  register: {
    url: 'auth/create-account/user/:user/confirmation/:confirmation'
  },
  accountActivation: {
    url: 'auth/account-activation/user-email/:user-email/confirmation-token/:confirmation-token'
  },
  changeAccountPassword: {
    url: 'auth/change-account-password/user-email/:user-email/change-account-password-token/:confirmation-token'
  },
  lostPasswordMailingPage: {
    url: 'auth/lost-password/mailing'
  },
  userHome: {
    url: 'users-page'
  }
}
