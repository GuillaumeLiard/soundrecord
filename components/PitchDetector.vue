<template>
	<div class="pitch-detector">
		<audio/>
		version 2 <br/>
		{{uniqFreqArray}}
	</div>
</template>

<script>
import { uniq } from 'lodash-es'

export default {
	data: function() {
		return {
			fftSize: 2048,
			frequency: 440,
			uniqFreqArray: null
		}
	},
	mounted: function() {
		this.init()
	},
	methods: {
		init: async function() {
			this.createAudioContext()
			this.createGain()

			// await this.createMicrophone()
			this.createOscillator()

			this.createAnalyser()
			this.connect()
			this.measureLoop()

		},
		createAudioContext: function() {
			this.context = new window.AudioContext
		},
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
			this.oscillator = this.context.createOscillator()
			this.oscillator.type = 'sine'
			this.oscillator.frequency.setValueAtTime(this.frequency, this.context.currentTime)
			this.startOscillator()
		},
		createGain: function() {
			this.gain = this.context.createGain()
			this.gain.gain.setValueAtTime(0.01, this.context.currentTime)
		},
		createAnalyser: function() {
			this.analyser = this.context.createAnalyser()
			this.bufferLength = this.analyser.frequencyBinCount
			this.dataArray = new Uint8Array(this.bufferLength)
		},
		connect: function() {
			// this.microphone.connect(this.gain)
			this.oscillator.connect(this.gain)

			this.gain.connect(this.analyser)
			this.analyser.connect(this.context.destination)
		},
		startOscillator: function() {
			this.oscillator.start();
		},
		getAnalyserTime: function() {
			this.analyser.getByteTimeDomainData(this.dataArray)
			return this.dataArray
		},
		getAnalyserFrequency: function() {
			this.analyser.getByteFrequencyData(this.dataArray)
			return this.dataArray
		},
		measureLoop: function() {
			// console.log("getAnalyserTime", this.getAnalyserTime())
			const freqArray = this.getAnalyserFrequency()
			const uniqFreqArray = uniq(freqArray)

			this.uniqFreqArray = uniqFreqArray

			// console.log("freqArray", freqArray)
			// console.log("uniqFreqArray", uniqFreqArray)
			requestAnimationFrame(() => this.measureLoop())
		}
	}
}
</script>
