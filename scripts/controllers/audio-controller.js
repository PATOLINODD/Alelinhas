function audioController(audioEl, volumeEl) {
    const { gainNode, audioContext } = audio(audioEl);

    gainNode.gain.value = volumeEl.value; //set the gain value.
    volumeEl.addEventListener('input', () => {
        gainNode.gain.value = volumeEl.value; // change the gain value as the user changes the input range.
        //How do I keep this volume across each document file?
        addToStorage('volume', volumeEl.value);
    })

    return audioContext;
}