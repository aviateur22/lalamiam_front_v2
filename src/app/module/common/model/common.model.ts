export class FlashMessage {
  constructor(
    public readonly message: string,
    public readonly isError: boolean
  ) {}
}

export class UserRoles {
  constructor(
    public  isAdmin: boolean,
    public  isProfessional: boolean,
    public  isClient: boolean,
    public  isAuthenticated: boolean,
    public isEmployee: boolean
  ){}

  updateRoles(roles: Partial<UserRoles>): void {
    if (roles.isAdmin !== undefined)
      this.isAdmin = roles.isAdmin;

    if (roles.isProfessional !== undefined)
      this.isProfessional = roles.isProfessional;

    if (roles.isClient !== undefined)
      this.isClient = roles.isClient;

    if (roles.isAuthenticated !== undefined)
       this.isAuthenticated = roles.isAuthenticated;

    if(roles.isEmployee !== undefined)
      this.isEmployee = roles.isEmployee;
  }
}



