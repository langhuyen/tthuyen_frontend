import Vue from 'vue'

import TInput from './components/TInput.vue'
import TButton from './components/TButton.vue'
import GoogleMap from './components/GoogleMap.vue'
import Tooltip from './components/Tooltip.vue'
import FormDate from './components/Date/FormDate.vue'
import Combobox from './components/Combobox/Combobox.vue'
import Map from '@/components/GoogleMapComponent.vue'
import Datatable from "@/components/TTable/Datatable.vue";
import TTextarea from "@/components/TTextarea.vue";
import TPopup from "@/components/TPopup.vue";
import Daterange from "@/components/Date/Daterange.vue";

Vue.component(TInput.name, TInput);
Vue.component(TButton.name, TButton);
Vue.component(GoogleMap.name, GoogleMap);
Vue.component(FormDate.name, FormDate);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Combobox.name, Combobox);
Vue.component(Map.name, Map);
Vue.component(Datatable.name, Datatable);
Vue.component(TTextarea.name, TTextarea);
Vue.component(TPopup.name, TPopup);
Vue.component(Daterange.name, Daterange);

export default Vue;