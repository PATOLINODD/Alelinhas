/**
 * Function takes the document element, such as the audio tag "<audio></audio>".
 * Its parameter it must be audio tag.
 * @param {*} el 
 */
function audio(el) {
    //I must to maintain the volume in each document file.
    const audioContext = new AudioContext(); //create the audio context.
    const track = audioContext.createMediaElementSource(el); //create the track.
    const gainNode = audioContext.createGain(); //create the gain node.
    let vol = getFromStorage('volume');
    if (!vol) {
        vol = 0.1; //keep the volume low
        addToStorage('volume', vol);
    }
    gainNode.gain.value = vol;
    track.connect(gainNode).connect(audioContext.destination); //connect the track to the gain node and the gain node to the destination.
    return {
        gainNode, audioContext
    }
}