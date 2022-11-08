<template>
  <div class="icon-background notification">
    <a href="#">
      <Icon icon="ant-design:bell-outlined" width="24px" color="gray" />
    </a>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';
export default {
  components: {
    Icon,
  },
  data() {
    return {
      isInProgress: false,
    }
  },
}
</script>

<style scoped lang="scss">
.notification {
  width: 36px !important;
  height: 33px !important;
  padding-bottom: 5px;
  margin-top: 6px;
}
</style>
