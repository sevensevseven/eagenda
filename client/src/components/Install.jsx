import { useEffect, useState } from "react";

const Install = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        const handler = (e) => {
            console.log("beforeinstallprompt event fired");
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener("beforeinstallprompt", handler);
        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the A2HS prompt");
                } else {
                    console.log("User dismissed the A2HS prompt");
                }
                setDeferredPrompt(null);
                window.location.href = "/";
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {deferredPrompt && (
                <button className="btn btn-primary" onClick={handleInstallClick}>Install App</button>
            )}
        </div>
    );
};

export default Install;