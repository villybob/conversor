import VueSingleSelect from 'vue-single-select';
import VueSuper from 'vue-super';
import Vue from 'vue';

Vue.use(VueSuper);

const SingleSelect = Vue.extend(VueSingleSelect);

const Select = SingleSelect.extend({
    methods: {
        handleClickOutside(e) {
            this.$super(Select, this).handleClickOutside(e);
            let data = null;
            
            if (e.type == 'blur'|| e.type == "keyup") {
                data = 'item-selected';
            }
            else if (e.type == 'click') {
                for (let i in e.path) {
                    if (e.path[i].className == 'single-select-wrapper') {
                        data = 'item-selected';
                        break;
                    }
                }
            }

            this.$emit('customblur', data);
        },
    },
})

export default Select;