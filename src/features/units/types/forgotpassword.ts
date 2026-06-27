export interface ForgotPasswordRequest{
    correo: string;
}
export interface ResetPassWord{
    token: string;
    password: string;
}