<template>
  <div rounded class="virtualCard">
    <div class="flex justify-end">
      <img class="" src="~assets/icons/AspireLogo-1.svg" />
    </div>
    <div class="virtualCard-name">{{card.name}}</div>
    <div class="virtualCard-number flex q-py-lg">
      <div v-for="(n, index) in 3" :key="index" class="q-mr-lg text-white">
        <q-icon name="mdi-circle" />
        <q-icon name="mdi-circle" />
        <q-icon name="mdi-circle" />
      </div>
      <div>
        {{ lastFourDigits }}
      </div>
    </div>
    <div class="flex items-center">
      <div class="virtualCard-expiry">Thru: {{card.expiry}}</div>
      <div class="q-ml-xl text-white flex items-center">
        <span class="virtualCard-cvv">CVV:</span>
        <span class="virtualCard-cvv_star">***</span>
      </div>
    </div>
    <div class="flex justify-end">
      <img class="" src="~assets/icons/VisaLogo.svg" />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
export default {
  name: "VirtualCard",
  props: {
    card: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const lastFourDigits = computed(function () {
        return props.card.number.substring(12,16)
    });    
    return {
      lastFourDigits
    };
  },
};
</script>

<style lang="scss" scoped>
.virtualCard {
  position: relative;
  background-color: #01d167;
  border-radius: 16px;
  padding: 28px;
  &-name {
    font-size: 24px;
    color: white;
  }
  &-number {
    font-size: 14px;
    color: white;
  }
  &-expiry,
  &-cvv {
    font-size: 13px;
    color: white;
  }
  &-cvv {
    &_star {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: -7px;
      margin-left: 4px;
    }
  }
}
</style>
