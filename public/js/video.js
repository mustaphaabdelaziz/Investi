const videoElement = document.querySelector('youtube-video');
    // must wait for DOM to be ready and for component to be accessible
    document.addEventListener('DOMContentLoaded', function () {
        // wait for loading
        videoElement.load().then(() => {
            // pause video after two seconds
            const timer = setTimeout(function () {
                videoElement.pause();
                clearTimeout(timer);
            }, 2000);
        });
    });