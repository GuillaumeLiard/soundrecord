<template>
	<div class="record">
		<audio/>
		<a v-if="downloadUrl" :href="downloadUrl" download>
			download generated [blank] mp3
		</a>
	</div>
</template>

<script>
import lamejs from 'lamejs'

export default {
	data: function() {
		return {
			downloadUrl: null,
		}
	},
	mounted: function() {
		this.saveMp3Blank()
	},
	methods: {
		saveMp3Blank: function() {
			const channels = 1 //1 for mono or 2 for stereo
			const sampleRate = 44100 //44.1khz (normal mp3 samplerate)
			const kbps = 128 //encode 128kbps mp3
			let mp3encoder = new lamejs.Mp3Encoder(channels, sampleRate, kbps)
			let mp3Data = []

			const samples = new Int16Array(10 * 44100) //one second of silence (get your data from the source you have)
			const sampleBlockSize = 1152 //can be anything but make it a multiple of 576 to make encoders life easier

			for (let i = 0; i < samples.length; i += sampleBlockSize) {
				const sampleChunk = samples.subarray(i, i + sampleBlockSize)
				let mp3buf = mp3encoder.encodeBuffer(sampleChunk)
				if (mp3buf.length > 0) {
					mp3Data.push(mp3buf)
				}
			}
			let mp3buf = mp3encoder.flush()   //finish writing mp3

			if (mp3buf.length > 0) {
				mp3Data.push(new Int8Array(mp3buf))
			}

			let blob = new Blob(mp3Data, {type: 'audio/mp3'})
			let url = window.URL.createObjectURL(blob)
			this.downloadUrl = url
			console.log('MP3 URl: ', url)
		}
	}
}
</script>
