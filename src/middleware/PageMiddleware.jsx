import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getValentineByCode } from "../repositiories/ValentineRepositories.js";
import { getConfessionByCode } from "../repositiories/ConfessionsRepositories.js";

export function PageMiddleware({ children }) {
    const { id: code } = useParams();
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(null);

    useEffect(() => {
        const validateCode = async () => {
            if (!code) {
                setIsValid(false);
                navigate('/not-found');
                return;
            }

            try {
                const [res1, res2] = await Promise.all([
                    getValentineByCode(code),
                    getConfessionByCode(code)
                ]);

                const result = res1 || res2;
                
                if (result) {
                    setIsValid(true);
                } else {
                    setIsValid(false);
                    navigate('/not-found');
                }
            } catch (error) {
                console.error("Error validating code:", error);
                setIsValid(false);
                navigate('/not-found');
            }
        };

        validateCode();
    }, [code, navigate]);

    if (isValid === null) {
        return null;
    }

    return <>{children}</>;
}