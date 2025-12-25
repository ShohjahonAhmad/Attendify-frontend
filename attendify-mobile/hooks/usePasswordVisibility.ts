import {useState} from "react";

export default function usePasswordVisibility() {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(prev => !prev);
    }

    return {
        passwordVisible,
        togglePasswordVisibility,
        secureTextEntry: !passwordVisible,
        iconName: passwordVisible ? "eye-slash" : "eye"
    }
}