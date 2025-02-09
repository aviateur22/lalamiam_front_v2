export default {
  home: {
    url: ''
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
    url: 'auth/create-account'
  },
  professionalRegister: {
    url: 'auth/professional/create-account'
  },
  userRegisterAsProfessional:{
    url: 'auth/user-email/:user-email/user-create-professional-account'
  },
  professionalRegisterConfirmation: {
    url: 'auth/professional-register-confirmation/user-email/:user-email/confirmation-token/:confirmation-token'
  },
  registerConfirmation: {
    url: 'auth/create-account/user/:user/confirmation/:confirmation'
  },
  accountActivation: {
    url: 'auth/account-activation/user-email/:user-email/confirmation-token/:confirmation-token'
  },
  changeLostAccountPassword: {
    url: 'auth/change-account-password/user-email/:user-email/change-account-password-token/:change-account-password-token'
  },
  changePassword: {
    url: 'auth/change-account-password/update-password'
  },
  lostPasswordMailingPage: {
    url: 'auth/lost-password/mailing'
  },
  userHome: {
    url: 'users-page'
  },
  // ADMIN
  adminDisplayProfessionalToActivatePage : {
    url: 'admin/display-professional-to-activate'
  },
  adminDisplayProfessionalToActivateDetailPage : {
    url: 'admin/display-professional-to-activate/detail/:professional-email'
}
}
