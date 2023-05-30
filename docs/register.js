// Define an asynchronous function to register a service worker
const registerServiceWorker = async () => {
    // Check if the browser supports service workers
    if ('serviceWorker' in navigator) {
        try {
            // Register the service worker with the specified file path and scope
            const registration = await navigator.serviceWorker.register('/worker.js', { scope: '/' });
            // Check the status of the service worker registration
            if (registration.installing) {
                console.log('Service worker installing');
            } else if (registration.waiting) {
                console.log('Service worker installed');
            } else if (registration.active) {
                console.log('Service worker active');
            };
        } catch (error) {
            // Log an error message if the service worker registration fails
            console.error(`Registration failed with ${error}`);
        };
    };
};

// Call the registerServiceWorker function to register the service worker
registerServiceWorker();
