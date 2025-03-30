import { useEffect } from "react";
import { useNavigate} from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem("id");
        if (!userId) {
            navigate("/", { replace: true }); // ✅ Safe to include 'navigate' now
        }
    }, [navigate]); // ✅ Added 'navigate' as a dependency

    return children;
}
