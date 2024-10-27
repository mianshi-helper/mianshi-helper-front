import { FormProvider } from "antd/es/form/context";
import RegisterForm from "./RegisterForm";

function Register() {
    return (
        <FormProvider>
            <RegisterForm />
        </FormProvider>
    )
}

export default Register;