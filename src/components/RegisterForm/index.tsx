import { Form } from "antd";
import { useCallback } from "react";
import { apiPostRegister } from "../../api/request";
import { RegisterParams } from "../../types/Register";
import FormContext from "./FormContext";
import { useForm } from "antd/es/form/Form";

function RegisterForm() {
    const handleSubmit = useCallback(async (value: RegisterParams) => {
        const res = await apiPostRegister(value);
        console.log(res);
    }, []);

    const [form] = useForm();

    return (
        <Form
            onFinish={handleSubmit}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            form={form}
        >
            <FormContext form={form} />
        </Form>
    )
}

export default RegisterForm;