export class ProfessionalToActivate {
  constructor(
    public readonly email: string,
    public readonly createdAt: Date,
    public readonly id: bigint
  ) {}
}

export class ProfessionalDetail {
  constructor(
    public readonly professionalEmail: string,
    public readonly accountCreatedAt: Date,
    public readonly accountRegisterConfirmAt: Date,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly phone: string,
    public readonly professionalId: bigint
  ){}
}
