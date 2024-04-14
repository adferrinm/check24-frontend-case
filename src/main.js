/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import App from "./App.vue";

import PrimeVue from "primevue/config";
import Menubar from "primevue/menubar";
import SideBar from "primevue/sidebar";
import FilterCard from "primevue/card";
import Panel from "primevue/panel";
import Dropdown from "primevue/dropdown";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import Avatar from "primevue/avatar";
import Card from "primevue/card";
import Tooltip from "primevue/tooltip";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

import pinia from "./store";

import "./assets/styles.scss";

const app = createApp(App);

app.use(pinia);
app.use(PrimeVue);

app.directive("tooltip", Tooltip);

app.component("Menubar", Menubar);
app.component("SideBar", SideBar);
app.component("FilterCard", FilterCard);
app.component("Panel", Panel);
app.component("Dropdown", Dropdown);
app.component("FloatLabel", FloatLabel);
app.component("InputText", InputText);
app.component("Checkbox", Checkbox);
app.component("Button", Button);
app.component("InputNumber", InputNumber);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Avatar", Avatar);
app.component("Card", Card);

app.mount("#app");
