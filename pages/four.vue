<template>
	<div class="four">
		stream file download
		<no-ssr>
			<FileStream/>
		</no-ssr>
	</div>
</template>

<script>
import FileStream from '~/components/FileStream'

	export default {
		components: {
			FileStream
		}
	}
</script>
