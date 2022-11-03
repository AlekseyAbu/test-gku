<template>
  <button
    class="button"
  >
  </button>
</template>

<script lang="ts">
import { ButtonHTMLAttributes, defineComponent, PropType } from 'vue';

interface ButtonProps extends ButtonHTMLAttributes{
  text: string
}

export default defineComponent({
  name: 'Button',
  props: {
    text: Object as PropType<ButtonProps>,
  },
});

</script>

<style scoped lang="scss">
.button {
  border: 1px solid green;
  background: #fff;
  padding: 10px 20px;
  color: green;
  margin-top: 40px;
}
</style>
