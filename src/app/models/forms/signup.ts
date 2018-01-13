export interface SignupFormModel {
    first_name: String;
    last_name: String;
    email: String;
    phone: String;
    primary_user: boolean;
    plan?: string;
}