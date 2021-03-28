<!--  -->
<template>
	<div>
		<button>{{ message }}</button>
	</div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
	name: "Button",
	props: {
		// 类型断言
		size: String as PropType<"small" | "middle" | "big">
	},
	data() {
		return {
			message: "foo"
		};
	},
	created() {
		this.message = "123";
		this.size === "small";
	}
});
</script>
<style lang="scss" scoped></style>