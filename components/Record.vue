<template>
	<div class="record">
		<video/>
		<audio/>
	</div>
</template>

<script>
export default {
	mounted: function() {
		this.getVid()
	},
	methods: {
		getVid: function() {
			// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
			// var constraints = { audio: true, video: { width: 1280, height: 720 } };
			var constraints = { audio: true, video: false }
			const userMedia = navigator.mediaDevices.getUserMedia(constraints)
			.then(mediaStream => {
				var audio = document.querySelector('audio');
				audio.srcObject = mediaStream
				audio.onloadedmetadata = function(e) {
					audio.play();
				};
			})
			.catch(function(err) {
				console.log(err.name + ": " + err.message)
				alert(err.name + ": " + err.message)
			}); // always check for errors at the end.
		}
	}
}
</script>
