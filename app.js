import {MDCRipple} from '@material/ripple/index';
import {MDCSelect} from '@material/select';
import {MDCDialog} from '@material/dialog';

const video = document.querySelector(".my-video");
const largeVideo = document.querySelector(".large-video");
const ripple = new MDCRipple(document.querySelector('.mdc-button'));
const select = new MDCSelect(document.querySelector('.mdc-select'));
const fabRipple = new MDCRipple(document.querySelector('.mdc-fab'));
const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
const dialogToggle = document.querySelector('.dialog-toggle');
const micToggle = document.querySelector('.mic-toggle');
const micMeter = document.querySelector('.mic-meter');

let muted = false;
let acceptAudioVideo = true;

// AV
if(navigator.mediaDevices && acceptAudioVideo) {
  navigator.mediaDevices.getUserMedia({ audio: true, video: true })
  .then(function(stream) {
    // Video
    video.srcObject = stream;

    // Audio
    let audioContext = new AudioContext();
    let analyser = audioContext.createAnalyser();
    let microphone = audioContext.createMediaStreamSource(stream);
    let javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

    analyser.smoothingTimeConstant = 0.8;
    analyser.fftSize = 1024;

    microphone.connect(analyser);
    analyser.connect(javascriptNode);
    javascriptNode.connect(audioContext.destination);
    javascriptNode.onaudioprocess = function() {
        var array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var values = 0;

        var length = array.length;
        for (var i = 0; i < length; i++) {
          values += (array[i]);
        }

        var average = values / length;

        micMeter.value = average;
    }
    })
    .catch(function(err) {
      /* handle the error */
  });

  // IGNORE THIS JUST FILLS LARGE VIDEO WITH SOMETHING
  navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1280 }, height: { ideal: 720 } } })
  .then(stream => largeVideo.srcObject = stream)
  .catch(err => console.log(err.message));
  // IGNORE THIS JUST FILLS LARGE VIDEO WITH SOMETHING
}

micToggle.addEventListener('click', (e) => {
  e.preventDefault();  
  if(video.muted == true) {
    video.muted = false
    document.querySelector('.cc-mic-setting--icon').innerHTML = 'mic';
  } else {
    video.muted = true
    document.querySelector('.cc-mic-setting--icon').innerHTML = 'mic_off';
  } 
})

dialogToggle.addEventListener('click', (e) => {
  e.preventDefault()
  dialog.open();
})

select.listen('MDCSelect:change', () => {
  alert(`Selected option at index ${select.selectedIndex} with value "${select.value}"`);
});