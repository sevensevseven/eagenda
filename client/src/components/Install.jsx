import { useEffect } from "react";

const Install = () => {
    useEffect(() => {
        const handler = (e) => {
            console.log("beforeinstallprompt event fired");
            e.preventDefault();

            // Show the install prompt immediately
            e.prompt();

            e.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the A2HS prompt");
                } else {
                    console.log("User dismissed the A2HS prompt");
                }
                window.location.href = "/";
            });
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => {
            window.removeEventListener("beforeinstallprompt", handler);
        };
    }, []);
    
    return (
        <></>
    )
}

export default Install;