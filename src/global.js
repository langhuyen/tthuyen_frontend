import Vue from 'vue'

import TInput from './components/TInput.vue'
import TButton from './components/TButton.vue'
import GoogleMap from './components/GoogleMap.vue'
import Tooltip from './components/Tooltip.vue'
import FormDate from './components/Date/FormDate.vue'
import Combobox from './components/Combobox/Combobox.vue'

Vue.component(TInput.name, TInput);
Vue.component(TButton.name, TButton);
Vue.component(GoogleMap.name, GoogleMap);
Vue.component(FormDate.name, FormDate);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Combobox.name, Combobox);

export default Vue;