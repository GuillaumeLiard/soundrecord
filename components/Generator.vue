<template>
	<div class="record">
		<audio/>
		<div class="gain">
			<v-container
			fluid
			grid-list-lg
			>
			<v-layout
			row
			wrap
			>
			<v-flex xs12 lg12>
				<v-slider
				v-model="volume"
				min=0
				max=1
				step=0.001
				:thumb-size="36"
				thumb-label="always"
				append-icon="volume_up"
				prepend-icon="volume_down"
				></v-slider>
			</v-flex>
			<v-btn
			:color="buttonColor"
			dark
			small
			fixed
			bottom
			right
			fab
			@click="togglePlay"
			>
				{{buttonText}}
			</v-btn>
		</v-layout>
	</v-container>
</div>
<a v-if="downloadUrl" :href="downloadUrl" download>
	download generated mp3
</a>
</div>
</template>

<script>

export default {
	data: function() {
		return {
			downloadUrl: null,
			frequency: 880,
			volume: 0.2,
			context: null,
			gainNode: null,
			oscillatorNode: null,
			mediaStreamDestination: null,
			mediaRecorder: null,
			play: false
		}
	},
	mounted: function() {
		this.createAudioContext()
		this.createGain()
		this.createOscillator()
		this.createMediaStreamDestination()
		this.connect()
		this.startOscillator()
	},
	computed: {
		buttonText: function() {
			return this.play ? 'stop' : 'start'
		},
		buttonColor: function() {
			return this.play ? 'red' : 'green'
		}
	},
	methods: {
		createAudioContext: function() {
			this.context = new window.AudioContext
		},
		createGain: function() {
			this.gainNode = this.context.createGain()
			this.gainNode.gain.setValueAtTime(this.volume, this.context.currentTime)
		},
		createOscillator: function() {
			this.oscillatorNode = this.context.createOscillator()
			this.oscillatorNode.type = 'square'
			this.oscillatorNode.frequency.setValueAtTime(this.frequency, this.context.currentTime)
		},
		createMediaStreamDestination: function() {
			this.mediaStreamDestination = this.context.createMediaStreamDestination();
			this.mediaRecorder = new MediaRecorder(this.mediaStreamDestination.stream);
		},
		connect: function() {
			this.gainNode.connect(this.context.destination)
		},
		startOscillator: function() {
			this.oscillatorNode.start();
		},
		togglePlay: function() {
			this.play = !this.play
		}
	},
	watch: {
		volume: function() {
			this.gainNode.gain.setValueAtTime(this.volume, this.context.currentTime)
		},
		play: function() {
			if (this.play) {
				this.oscillatorNode.connect(this.gainNode)
			} else {
				this.oscillatorNode.disconnect(this.gainNode)
			}
		}
	}
}
</script>
