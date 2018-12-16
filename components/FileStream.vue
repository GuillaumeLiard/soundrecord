<template>
	<div class="file-stream">
		<button @click="write1024a">
			download 1024 a
		</button>
		<div class="record-mic">
			<button @click="writeMicrophone">
				click to download Mircrophone stream for 5 seconds
			</button>
			<br/>
			recording : {{ recording }}
		</div>
	</div>
</template>

<script>

export default {
	data: function() {
		return {
			recording: false
		}
	},
	mounted: function() {
		this.streamSaver = require('streamsaver')
	},
	methods: {
		write1024a: function() {
			const { streamSaver } = this
			const fileStream = streamSaver.createWriteStream('1024a.txt')
			const writer = fileStream.getWriter()
			const encoder = new TextEncoder
			let data = 'a'.repeat(1024)
			let uint8array = encoder.encode(data + "\n\n")

			writer.write(uint8array)
			writer.close()

		},
		writeMicrophone: function() {
			const { streamSaver } = this
			const constraints = { audio: true, video: false }
			const userMedia = navigator.mediaDevices
			.getUserMedia(constraints)
			.then(mediaStream => {
				// const FileReader = require('screw-filereader')
				require('screw-filereader')
				// console.log("fr", fr);
				let fr = new FileReader
				let mediaRecorder = new MediaRecorder(mediaStream)
				let chunks = Promise.resolve()
				let fileStream = streamSaver.createWriteStream('filename.wav')
				let writer = fileStream.getWriter()
				// use .mp4 for video(camera & screen) and .wav for audio(microphone)

				// Start recording
				mediaRecorder.start()
				this.recording = true
				// closeBtn.onclick = event => {
				// 	mediaRecorder.stop()
				// 	setTimeout(() =>
				// 	chunks.then(evt => writer.close())
				// 	, 1000)
				// }

				setTimeout(() => {
					mediaRecorder.stop()
					setTimeout(() =>
					chunks.then(evt => {
						writer.close()
						this.recording = false
					})
					, 1000)
				}, 5000)

				mediaRecorder.ondataavailable = ({blob}) => {
					// console.log("blob", blob);
					if (blob) {
						chunks = chunks.then(() => new Promise(resolve => {
							fr.onload = () => {
								writer.write(new Uint8Array(fr.result))
								resolve()
							}
							fr.readAsArrayBuffer(blob)
						}))
					}
				}

			})
		}
	}
}
</script>

<style>
	.file-stream {
		display: flex;
		flex-direction: column;
	}
	.record-mic {
		margin-top: 40px;
	}
</style>
