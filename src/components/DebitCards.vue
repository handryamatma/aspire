<template>
  <div :class="[$q.screen.xs || $q.screen.sm ? 'bg-dark-blue' : '']">
    <q-dialog v-model="cancelConfirmation">
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Are you sure ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Yes" color="primary" @click="handleCancelCard" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div :class="[$q.screen.xs || $q.screen.sm ? 'q-px-lg bg-dark-blue' : '']">
      <q-carousel
        v-model="slide"
        animated
        navigation
        infinite
        :swipeable="true"
        :autoplay="false"
        :arrows="false"
        transition-prev="fade"
        transition-next="fade"
        class="carousel"
        :class="[$q.screen.xs || $q.screen.sm ? 'bg-dark-blue' : '']"
      >
        <template #navigation-icon="{ active, onClick }">
          <div
            class="dotControl"
            :class="{
              'is-active': active,
            }"
            @click="onClick"
          ></div>
        </template>
        <q-carousel-slide
          v-for="(card, index) in cards"
          :key="index"
          :name="index"
        >
          <div :class="{ freezeCard: card.frozen }">
            <div class="flex justify-end">
              <div
                class="flex q-py-sm showNumber"
                :class="[$q.screen.xs || $q.screen.sm ? 'q-px-lg' : '']"
              >
                <img
                  class="showNumber-icon"
                  src="~assets/icons/remove_red_eye.svg"
                />
                <div class="q-ml-sm showNumber-text">Show card number</div>
              </div>
            </div>
            <VirtualCard :card="card" />
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <div
      rounded
      class="cardAction flex justify-between"
      :class="[$q.screen.xs || $q.screen.sm ? 'q-mt-md' : 'q-mt-xl']"
    >
      <div class="text-center cursor-pointer" @click="handleFreeze">
        <img class="" src="~assets/icons/Freezecard.svg" />
        <div v-if="!cards[slide].frozen" class="cardAction-text">
          Freeze card
        </div>
        <div v-else class="cardAction-text">Unfreeze card</div>
      </div>
      <div class="text-center">
        <img class="" src="~assets/icons/SetSpendLimit.svg" />
        <div class="cardAction-text">Set spend limit</div>
      </div>
      <div class="text-center">
        <img class="" src="~assets/icons/GPay.svg" />
        <div class="cardAction-text">Add to GPay</div>
      </div>
      <div class="text-center">
        <img class="" src="~assets/icons/ReplaceCard.svg" />
        <div class="cardAction-text">Replace card</div>
      </div>
      <div
        class="text-center cursor-pointer"
        @click="cancelConfirmation = true"
      >
        <img class="" src="~assets/icons/DeactivateCard.svg" />
        <div class="cardAction-text">Cancel card</div>
      </div>
    </div>
  </div>
</template>

<script>
import { watch, computed, ref } from "vue";
import { useStore } from "vuex";
import VirtualCard from "components/VirtualCard.vue";

export default {
  name: "DebitCards",
  components: {
    VirtualCard,
  },
  setup() {
    const store = useStore();
    const slide = ref(0);
    const cancelConfirmation = ref(false);
    const activeCardIndex = computed(function () {
      return store.state.cards.activeCardIndex;
    });

    watch(activeCardIndex, (currentValue) => {
      slide.value = currentValue;
    });

    let cards = computed(function () {
      return store.state.cards.cards;
    });

    const handleCancelCard = () => {
      store.dispatch("cards/deleteCard", slide.value);
      cancelConfirmation.value = false;
    };

    const handleFreeze = () => {
      store.dispatch("cards/freezeCard", {
        index: slide.value,
        action: !cards.value[slide.value].frozen,
      });
    };

    return {
      slide,
      activeCardIndex,
      cards,
      cancelConfirmation,
      handleCancelCard,
      handleFreeze,
    };
  },
};
</script>

<style lang="scss" scoped>
.showNumber {
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  background: white;
  &-text {
    color: #01d167;
    font-size: 12px;
    font-weight: bold;
  }
  &-icon {
    width: 16px;
  }
  &::before {
    content: "";
    position: absolute;
    width: 0px;
    height: 0px;
    border-width: 0 11px 12px 0;
    border-color: transparent #fff transparent transparent;
    border-style: solid;
    right: 0;
    bottom: 245px;
  }
}

::v-deep .carousel {
  height: auto;
  .q-carousel {
    &__control {
      position: initial;
    }
    &__slide {
      padding: 0px 0px 16px 0px;
    }
  }
  .dotControl {
    margin: 0 4px;
    padding: 0;
    background-color: #01d167;
    width: 8px;
    height: 8px;
    border-radius: 10px;
    cursor: pointer;
    opacity: 0.2;
    transition: width 0.3s ease-in-out;
  }

  .is-active {
    width: 16px;
    opacity: 1;
  }
}

.cardAction {
  background-color: #edf3ff;
  border-radius: 8px;
  padding: 28px;
  flex-wrap: nowrap;
  &-text {
    color: #0c365a;
    font-size: 13px;
  }
}
@media (max-width: 1007px) {
  .cardAction {
    border-top-left-radius: 36px;
    border-top-right-radius: 36px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
}

.freezeCard {
  opacity: 0.2;
}
</style>
