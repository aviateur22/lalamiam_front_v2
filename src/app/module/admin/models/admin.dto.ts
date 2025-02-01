export interface IProfessionalToActivateDto  {
  id: bigint,
  professionalEmail: string,
  accountCreatedAt: Date
}

export interface IProfessionalsToActivateListDto {
  professionals: IProfessionalToActivateDto[]
}
