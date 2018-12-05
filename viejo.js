Vue.component('converter',{
	template:'#converter_template'
})

Vue.component('VueAutonumeric')


new Vue({
	el : '#body_wrap',
	
	data: {
		autoNumericModel1 : 1,
		autoNumericModel2 : 1,
		input1: 1,
		input2: 2,
	},



	methods: {
		newTemplate : function(){

			this.input1+=1, this.input2+=1;
			var insert = document.getElementById('plus_wrap');
			var addTemplate= '<converter></converter>';
			insert.innerHTML = addTemplate;
			
		},
	}
});


console.log('AutoNumeric.version():', AutoNumeric.version());


