import { defineCustomElement } from "vue";
import Widget from "../components/Widget.vue";

const WidgetElement = defineCustomElement(Widget);

customElements.define("widget-component", WidgetElement);
