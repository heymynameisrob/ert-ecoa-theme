import {MDCRipple} from '@material/ripple/index';
import {MDCSelect} from '@material/select';
import {MDCDialog} from '@material/dialog';
import {MDCList} from '@material/list';

const video = document.querySelector("#userVideo");
const ripple = new MDCRipple(document.querySelector('.mdc-button'));
const select = new MDCSelect(document.querySelector('.mdc-select'));
const fabRipple = new MDCRipple(document.querySelector('.mdc-fab'));
const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
const dialogToggle = document.querySelector('.dialog-toggle');

dialogToggle.addEventListener('click', (e) => {
  e.preventDefault()
  dialog.open();
})


select.listen('MDCSelect:change', () => {
  alert(`Selected option at index ${select.selectedIndex} with value "${select.value}"`);
});

let acceptAudioVideo = true;

if (navigator.mediaDevices.getUserMedia && acceptAudioVideo) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err) {
      console.log("Something went wrong!", err);
    });
}