import {OrganizationCategory} from "@app/organization/organization-list-page/model/organization-category";

export class Organization {
  id: string;
  category = OrganizationCategory.NGO;
  name: string;
  email: string;
  phoneNumber: string;
  website: string;
  address: string;
  contactPersonName: string;
  contactPersonEmail: string;
  logoUrl: string;
  numberOfMembers?: string;

  constructor(organization: Partial<Organization> = {}) {
    Object.assign(this, organization);
  }
}
