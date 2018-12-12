<template>
	<div class="pitch-detector">
		<audio/>
		{{uniqFreqArray}}
	</div>
</template>

<script>
import { uniq } from 'lodash-es'

export default {
	data: function() {
		return {
			fftSize: 2048,
			frequency: 880,
			uniqFreqArray: null
		}
	},
	mounted: function() {
		this.init()
	},
	methods: {
		init: async function() {
			this.createAudioContext()
			// await this.createMicrophone()
			this.createOscillator()
			this.createAnalyser()
			this.connect()
			this.startOscillator()
			// console.log("getAnalyserTime", this.getAnalyserTime())
			const freqArray = this.getAnalyserFrequency()
			const uniqFreqArray = uniq(freqArray)
			console.log("freqArray", freqArray)
			console.log("uniqFreqArray", uniqFreqArray)
			this.uniqFreqArray = uniqFreqArray
		},
		createAudioContext: function() {
			this.context = new window.AudioContext
		},
		// createMicrophone: function() {
		// 	// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
		// 	// var constraints = { audio: true, video: { width: 1280, height: 720 } };
		// 	var constraints = { audio: true, video: false }
		// 	const userMedia = navigator.mediaDevices.getUserMedia(constraints)
		// 	.then(mediaStream => {
		// 		var audio = document.querySelector('audio');
		// 		audio.srcObject = mediaStream
		// 		// audio.onloadedmetadata = function(e) {
		// 		// 	audio.play();
		// 		// };
		// 	})
		// 	.catch(function(err) {
		// 		console.log(err.name + ": " + err.message)
		// 		alert(err.name + ": " + err.message)
		// 	}); // always check for errors at the end.
		// },
		createMicrophone: function() {
			return navigator.mediaDevices.getUserMedia({audio: true}).
			then((stream) => {
				this.microphone = this.context.createMediaStreamSource(stream);
				// const filter = context.createBiquadFilter();
				// // microphone -> filter -> destination
				// microphone.connect(filter);
				// filter.connect(context.destination);
			});
		},
		createOscillator: function() {
			this.oscillatorNode = this.context.createOscillator()
			this.oscillatorNode.type = 'sine'
			this.oscillatorNode.frequency.setValueAtTime(this.frequency, this.context.currentTime)
		},
		createAnalyser: function() {
			this.analyser = this.context.createAnalyser()
			this.bufferLength = this.analyser.frequencyBinCount
			this.dataArray = new Uint8Array(this.bufferLength)
			// this.analyser.getByteTimeDomainData(dataArray)
		},
		connect: function() {
			// this.oscillatorNode.connect(this.analyser)
			// this.microphone.connect(this.analyser)
			// this.analyser.connect(this.context.destination)
			this.gainNode = this.context.createGain()
			this.gainNode.gain.setValueAtTime(0.5	, this.context.currentTime)
			// this.oscillatorNode.connect(this.gainNode)
			this.microphone.connect(this.gainNode)
			this.gainNode.connect(this.context.destination)
		},
		startOscillator: function() {
			this.oscillatorNode.start();
		},
		getAnalyserTime: function() {
			this.analyser.getByteTimeDomainData(this.dataArray)
			return this.dataArray
		},
		getAnalyserFrequency: function() {
			this.analyser.getByteFrequencyData(this.dataArray)
			return this.dataArray
		},
	}
}
</script>
