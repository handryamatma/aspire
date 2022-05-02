<template>
  <q-expansion-item
    dense
    class="expansion q-mt-lg"
    expand-icon-class="hidden"
    :default-opened="item.name === 'Recent transactions'"
  >
    <template v-slot:header>
      <q-item-section avatar>
        <img class="" :src="item.icon" />
      </q-item-section>
      <q-item-section class="expansion__header-text">
        {{ item.name }}
      </q-item-section>
      <div class="ml-auto toggleIcon flex flex-center">
        <img src="~assets/icons/down-arrow.svg" />
      </div>
    </template>
    <div v-if="transactions && transactions.length">
      <div v-if="item.name === 'Recent transactions'">
        <q-list class="q-pa-lg">
          <div v-for="(list, index) in transactions" :key="index">
            <q-item class="transactionList">
              <q-item-section avatar class="transaction-icon">
                <div
                  v-if="list.type === 'file-storage'"
                  class="circle circle-blueFade"
                >
                  <img src="~assets/icons/file-storage.svg" />
                </div>
                <div
                  v-if="list.type === 'flight'"
                  class="circle circle-greenFade"
                >
                  <img src="~assets/icons/flights.svg" />
                </div>
                <div
                  v-if="list.type === 'anouncement'"
                  class="circle circle-redFade"
                >
                  <img src="~assets/icons/megaphone.svg" />
                </div>
              </q-item-section>

              <q-item-section>
                <q-item-label class="transaction-name">{{ list.name }}</q-item-label>
                <q-item-label class="transaction-date">{{ list.date }}</q-item-label>
                <div class="flex transaction-desc">
                  <div class="dark-circle q-mr-sm">
                    <img src="~assets/icons/business-and-finance.svg" />
                  </div>
                  {{ list.desc }}
                </div>
              </q-item-section>

              <q-item-section
                side
                class="transaction-amount flex"
                :class="[
                  list.desc === 'Refund on debit card'
                    ? 'transaction-greenText'
                    : 'text-black',
                ]"
              >
                <div class="flex">
                  {{ list.desc === "Refund on debit card" ? "+" : "-" }} S${{
                    list.amount
                  }}
                  <img class="q-ml-sm" src="~assets/icons/next.svg" />
                </div>
              </q-item-section>
            </q-item>
            <q-separator
              class="q-mb-lg"
              v-if="transactions.length - 1 !== index"
            />
          </div>
        </q-list>
        <div class="transaction-more q-py-md text-center">
          View all card transactions
        </div>
      </div>
      <div v-else class="q-pa-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliqui
      </div>
    </div>
  </q-expansion-item>
</template>

<script>
export default {
  name: "Expansion",
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const transactions = [
      {
        id: 1,
        name: "Hamleys",
        date: "20 May 2020",
        amount: 150,
        type: "file-storage",
        desc: "Refund on debit card",
      },
      {
        id: 2,
        name: "Hamleys",
        date: "20 May 2020",
        amount: 150,
        type: "flight",
        desc: "Charged to debit card",
      },
      {
        id: 3,
        name: "Hamleys",
        date: "20 May 2020",
        amount: 150,
        type: "anouncement",
        desc: "Charged to debit card",
      },
      {
        id: 4,
        name: "Hamleys",
        date: "20 May 2020",
        amount: 150,
        type: "file-storage",
        desc: "Charged to debit card",
      },
    ];
    return {
      transactions,
    };
  },
};
</script>

<style lang="scss" scoped>
.q-expansion-item--expanded {
  .toggleIcon {
    transform: rotate(180deg);
  }
}
.circle {
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  &-blueFade {
    background-color: #009dff1a;
  }
  &-greenFade {
    background-color: #00d6b51a;
  }
  &-redFade {
    background-color: #f251951a;
  }
}
.transaction {
  &-icon {
    justify-content: flex-start;
  }
  &-name {
    font-size: 14px;
    font-weight: 700;
  }
  &-date {
    font-size: 13px;
    color: #AAAAAA;
  }
  &-amount {
    font-size: 14px;
    font-weight: bold;
    justify-content: flex-start !important;
  }
  &-greenText {
    color: #01d167;
  }
  &-desc {
    margin-top: 14px;
    font-size: 12px;
    color: #325baf;
  }
  &-more {
    background: #EDFFF5;
    color: #01D167;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    font-size: 13px;
    font-weight: 700;
  }
}
.dark-circle {
  width: 24px;
  height: 20px;
  background-color: #325baf;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
