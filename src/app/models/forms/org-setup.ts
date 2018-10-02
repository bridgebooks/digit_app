export interface OrgSetupModel {
    name: String;
    logo_url?: string;
    industry_id?: Number;
    address_line_1?: String | null;
    address_line_2?: String;
    city_town?: String;
    state_region?: String;
    postal_zip?: String;
    country?: String;
}
