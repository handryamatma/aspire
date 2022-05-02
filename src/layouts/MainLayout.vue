<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="sidebar">
      <q-list class="">
        <img src="~assets/icons/AspireLogo.svg" />
        <div class="sidebar-text">
          Trusted way of banking for 3,000+ SMEs and startups in Singapore
        </div>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          class="q-mb-lg"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer
      v-if="$q.screen.xs || $q.screen.sm"
      bordered
      class="bg-white text-primary"
    >
      <q-tabs
        no-caps
        active-color="primary"
        indicator-color="transparent"
        class="text-grey"
      >
        <q-tab
          v-for="link in essentialLinks"
          :key="link.title"
          @click="$router.push(`${link.link}`)"
        >
          <div class="tab--icon-wrapper flex items-center">
            <img :src="require(`../assets/icons/${link.icon}-grey.svg`)" />
          </div>
          <div
            class="tab--text"
            :class="[$route.path === link.link ? 'activeLink' : 'tab--text-white']"
          >
            {{ link.title }}
          </div>
        </q-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Home",
    icon: "Home",
    link: "/",
  },
  {
    title: "Cards",
    icon: "Card",
    link: "/cards",
  },
  {
    title: "Payments",
    icon: "Payments",
    link: "/payments",
  },
  {
    title: "Credit",
    icon: "Credit",
    link: "/credit",
  },
  {
    title: "Settings",
    icon: "Account",
    link: "/settings",
  },
];

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style>
.sidebar {
  padding: 48px;
  background-color: #0c365a;
}
.sidebar-text {
  color: #fff;
  opacity: 0.3;
  font-size: 15px;
  margin-top: 19px;
  margin-bottom: 75px;
}
.bg-dark-blue {
  background-color: #0c365a;
}
.activeLink {
  color: #01d167;
  font-weight: 700;
}
</style>

<style lang="scss" scoped>
.tab {
  &--icon {
    &-wrapper {
      height: 24px;
    }
  }
  &--text {
    font-size: 13px;
    &-color {
    color: #dddddd;
  }
  }
}
:deep(.q-drawer) {
  width: 340px !important;
}
.q-page-container {
  padding-left: 340px !important;
}
@media (max-width: 1007px) {
  .q-page-container {
    padding-left: 0px !important;
  }
}
</style>
