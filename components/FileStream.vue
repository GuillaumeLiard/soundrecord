<template>
	<div class="file-stream">
		<button @click="write1024a">
			download 1024 a
		</button>
	</div>
</template>

<script>

export default {
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

		}
	}
}
</script>
