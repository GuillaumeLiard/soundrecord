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
			<v-flex xs12>
				<v-slider
				v-model="volume"
				min=0
				max=1
				step=0.1
				append-icon="volume_up"
				prepend-icon="volume_down"
				></v-slider>
			</v-flex>
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
			volume: 0,
			context: null,
			gainNode: null,
			oscillatorNode: null
		}
	},
	mounted: function() {
		this.createAudioContext()
		this.createGain()
		this.createOscillator()
		this.connect()
		this.startOscillator()
	},
	methods: {
		createAudioContext: function() {
			this.context = new window.AudioContext
		},
		createGain: function() {
			this.gainNode = this.context.createGain()
			// this.gainNode.gainNode.value = 0
			this.gainNode.gain.setValueAtTime(this.volume, this.context.currentTime)
		},
		createOscillator: function() {
			this.oscillatorNode = this.context.createOscillator()
			this.oscillatorNode.type = 'square'
			this.oscillatorNode.frequency.setValueAtTime(this.frequency, this.context.currentTime)
		},
		connect: function() {
			this.oscillatorNode.connect(this.gainNode)
			this.gainNode.connect(this.context.destination)
		},
		startOscillator: function() {
			this.oscillatorNode.start();
		}
	},
	watch: {
		volume: function() {
			// console.log("gain changed", this.volume);
			this.gainNode.gain.setValueAtTime(this.volume, this.context.currentTime)

		}
	}
}
</script>
