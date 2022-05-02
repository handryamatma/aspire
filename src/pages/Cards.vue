<template>
  <q-page :class="[$q.screen.xs || $q.screen.sm ? '' : 'q-pa-xl']">
    <q-dialog v-model="showModal">
      <q-card style="width: 700px; max-width: 80vw">
        <q-form @submit="handleAddCard">
          <q-card-section>
            <div class="text-h6">Add Card</div>
            <q-input
              outlined
              v-model="cardName"
              :rules="[(val) => !!val || '* Required']"
              lazy-rules
              label="Card Name"
              dense
              class="q-mt-lg"
            />
          </q-card-section>
          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="OK" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <div class="flex justify-between items-end header">
      <div>
        <div class="header-text">Available balance</div>
        <div class="flex items-center">
          <div class="header-currency">S$</div>
          <div class="header-balance">3,000</div>
        </div>
      </div>
      <div class="header-button flex items-center cursor-pointer" @click="handleOpenModal">
        <img
          v-if="$q.screen.xs || $q.screen.sm"
          src="~assets/icons/box-blue.svg"
          class="q-mr-sm"
        />
        <img v-else src="~assets/icons/box.svg" class="q-mr-sm" />
        New card
      </div>
    </div>

    <q-tabs
      v-model="tab"
      align="left"
      indicator-color="light-blue-6"
      narrow-indicator
      class="tabWrapper"
      :class="[
        $q.screen.xs || $q.screen.sm
          ? 'q-px-lg bg-dark-blue text-white'
          : 'text-black',
      ]"
    >
      <q-tab name="debitCards"> <span class="tabWrapper--tab-text">My debit cards</span></q-tab>
      <q-tab name="companyCards" disable
        ><span class="tabWrapper--tab-text">All company cards</span>
      </q-tab>
    </q-tabs>

    <div
      class="q-pt-md"
      :class="[$q.screen.xs || $q.screen.sm ? 'bg-dark-blue' : '']"
    >
      <q-card
        class="wrapper"
        :class="[$q.screen.xs || $q.screen.sm ? '' : 'q-pa-lg']"
      >
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="debitCards">
            <div class="row">
              <div
                v-if="cards && cards.length"
                class="col-12 col-md-6"
                :class="[
                  $q.screen.xs || $q.screen.sm ? 'q-pa-none' : 'q-pr-xl',
                ]"
              >
                <DebitCards />
              </div>
              <div
                class="col-12 col-md-6"
                :class="[
                  $q.screen.xs || $q.screen.sm ? 'q-px-lg q-pb-lg ' : '',
                ]"
              >
                <Expansion
                  v-for="(item, index) in expansionItems"
                  :key="index"
                  :item="item"
                />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="companyCards"> companyCards </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { computed, watch, ref } from "vue";
import { useStore } from "vuex";
import Expansion from "components/Expansion.vue";
import DebitCards from "components/DebitCards.vue";

export default {
  name: "Cards",
  components: {
    Expansion,
    DebitCards,
  },
  setup() {
    const store = useStore();
    const tab = ref("debitCards");
    const showModal = ref(false);
    const cardName = ref("");
    const expansionItems = [
      {
        name: "Card details",
        icon: require("../assets/icons/Group11889.svg"),
      },
      {
        name: "Recent transactions",
        icon: require("../assets/icons/Group11889-1.svg"),
      },
    ];

    let cards = computed(function () {
      return store.state.cards.cards;
    });

    const clearForm = () => {
      cardName.value = "";
    };

    const handleAddCard = () => {
      if (!cardName.value) {
        return;
      }
      const randomNumber = (length) => {
        let a = 1;
        for (let i = 0; i < length; i++) {
          a = a * 10;
        }
        return Math.floor(a + Math.random() * (9 * a)).toString();
      };

      const randomDate = (min, max) => {
        return Math.floor(Math.random() * (max - min));
      };

      const cardPayload = {
        name: cardName.value,
        number: randomNumber(16),
        expiry: `${randomDate(1, 12)}/${randomDate(22, 99)}`,
        cvv: randomNumber(3),
        frozen: false,
      };
      store.dispatch("cards/addCard", cardPayload);
      showModal.value = false;
    };

    const handleOpenModal = () => {
      showModal.value = true;
    };

    watch(showModal, (currentValue) => {
      if (!currentValue) {
        cardName.value = "";
      }
    });

    return {
      tab,
      expansionItems,
      showModal,
      cardName,
      cards,
      handleAddCard,
      handleOpenModal,
      clearForm,
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  border: 1px solid #fcfcfc;
  box-shadow: 0 2px 12px #00000014;
}

@media (max-width: 1007px) {
  .wrapper {
    border: none;
    box-shadow: none;
  }
}

.header {
  margin-bottom: 34px;
  &-text {
    color: #222222;
    font-size: 14px;
  }
  &-currency {
    background-color: #01d167;
    border-radius: 4px;
    color: #fff;
    padding: 2px 13px;
    margin-right: 12px;
  }
  &-balance {
    color: #222222;
    font-size: 26px;
    font-weight: bold;
  }
  &-button {
    background: #325baf;
    border-radius: 4px;
    color: #fff;
    padding: 10px 12px;
    font-size: 13px;
    font-weight: bold;
  }
}

@media (max-width: 1007px) {
  .header {
    padding: 24px;
    margin-bottom: 0px;
    background-color: #0c365a;
    &-text {
      color: #fff;
      font-size: 14px;
    }
    &-balance {
      color: #fff;
      font-size: 26px;
    }
    &-button {
      background: transparent;
      border-radius: 4px;
      color: #23cefd;
      padding: 10px 12px;
      font-size: 13px;
    }
  }

  .q-tab-panel {
    padding: 0;
  }
}

::v-deep .expansion {
  .q-item {
    border-radius: 8px;
    background-color: #f5f9ff;
    padding: 27px 24px;
  }

  .q-expansion-item {
    &__container {
      border: 1px solid #f0f0f0;
      border-radius: 8px;
      box-shadow: 0px 0px 8px #0000000a;
    }
  }

  &__header {
    &-text {
      color: #0c365a;
      font-size: 14px;
    }
  }
  .transactionList {
    padding: 0 0 24px 0;
    border: none;
    box-shadow: none;
    background: none;
  }
}

.tabWrapper {
  &--tab-text {
    font-size: 14px;
    font-weight: bold;
    text-transform:capitalize;
  }
  .q-tab {
    padding: 0px;
    margin-right: 16px;
    min-height: 40px;
  }
}

</style>
