// Copyright (c) 2023, Renu and contributors
// For license information, please see license.txt



frappe.ui.form.on('Regular Production Man Hour', {
	production_qtyunit: function (frm) {
		frm.call({
			method: 'manhour',//function name defined in python
			doc: frm.doc, //current document
		});
	},
	regular_production_man_hour_remove: function (frm) {
		frm.call({
			method: 'manhour',//function name defined in python
			doc: frm.doc, //current document
		});
	}


});
frappe.ui.form.on('Irregular Production Man Hour', {
	production_qtyunits: function (frm) {
		frm.call({
			method: 'qty',//function name defined in python
			doc: frm.doc, //current document
		});
	},
	irregular_production_man_hour_remove: function (frm) {
		frm.call({
			method: 'qty',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})
frappe.ui.form.on('Irregular Production Man Hour', {
	kt_min: function (frm) {
		frm.call({
			method: 'irregular',//function name defined in python
			doc: frm.doc, //current document
		});
	},
	irregular_production_man_hour_remove: function (frm) {
		frm.call({
			method: 'irregular',//function name defined in python
			doc: frm.doc, //current document
		});
	}

})
frappe.ui.form.on('Irregular Production Man Hour', {
	stmin: function (frm) {
		frm.call({
			method: 'irregular_st',//function name defined in python
			doc: frm.doc, //current document
		});
	},
	irregular_production_man_hour_remove: function (frm) {
		frm.call({
			method: 'irregular_st',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})
frappe.ui.form.on('Daily Production Report', {
	setup: function (frm) {
		frm.call({
			method: 'particulars',//function name defined in python
			doc: frm.doc, //current document
		});
		
	}
})
frappe.ui.form.on('Daily Production Report', {
	normal_working_hours: function (frm) {
		frm.call({
			method: 'today_working_time',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})
frappe.ui.form.on('Daily Production Report', {
	over_time_working_hours: function (frm) {
		frm.call({
			method: 'today_over_time_cal',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})
frappe.ui.form.on('Daily Production Report', {
	normal_accumulate: function (frm) {
		frm.call({
			method: 'cal_accumulate',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})




frappe.ui.form.on('Production Manpower', {
	direct_temporary: function (frm) {
		frm.call({
			method: 'subtotal',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})
frappe.ui.form.on('Production Manpower', {
	direct_permanent: function (frm) {
		frm.call({
			method: 'subtotal',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})

frappe.ui.form.on('Production Manpower', {
	supplementary_transportation : function (frm) {
		frm.call({
			method: 'supptotal',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})

frappe.ui.form.on('Production Manpower', {
	supplementary_supervisor : function (frm) {
		frm.call({
			method: 'supptotal',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})

frappe.ui.form.on('Production Manpower', {
	supplementary_line_leader : function (frm) {
		frm.call({
			method: 'supptotal',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})

frappe.ui.form.on('Production Manpower', {
	supplementary_repair : function (frm) {
		frm.call({
			method: 'supptotal',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})

frappe.ui.form.on('Production Manpower', {
	supplementary_repair : function (frm) {
		frm.call({
			method: 'supptotal',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})

frappe.ui.form.on('Production Manpower', {
	direct_permanent : function (frm) {
		frm.call({
			method: 'total',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})

// frappe.ui.form.on('Production Manpower', {
// 	accumulate : function (frm) {
// 		frm.call({
// 			method: 'accumulate',//function name defined in python
// 			doc: frm.doc, //current document
// 		});
// 	}
// })
frappe.ui.form.on('Production Manpower', {
	direct_temporary : function (frm) {
		frm.call({
			method: 'total',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})
frappe.ui.form.on('Production Manpower', {
	supplementary_supervisor : function (frm) {
		frm.call({
			method: 'total',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})

frappe.ui.form.on('Production Manpower', {
	supplementary_line_leader : function (frm) {
		frm.call({
			method: 'total',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})
frappe.ui.form.on('Production Manpower', {
	supplementary_repair : function (frm) {
		frm.call({
			method: 'total',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})

frappe.ui.form.on('Production Manpower', {
	supplementary_transportation : function (frm) {
		frm.call({
			method: 'total',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})

frappe.ui.form.on('Production Manpower', {
	support : function (frm) {
		frm.call({
			method: 'total',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})

frappe.ui.form.on('Production Manpower', {
	direct_permanent : function (frm) {
		frm.call({
			method: 'set_normal_temp',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})

frappe.ui.form.on('Production Manpower', {
	direct_temporary : function (frm) {
		frm.call({
			method: 'set_normal_temp',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})


frappe.ui.form.on('Production Manpower', {
	sub_total : function (frm) {
		frm.call({
			method: 'set_normal_temp',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})


frappe.ui.form.on('Production Manpower', {
	supplementary_supervisor : function (frm) {
		frm.call({
			method: 'set_normal_temp',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})

frappe.ui.form.on('Production Manpower', {
	supplementary_line_leader : function (frm) {
		frm.call({
			method: 'set_normal_temp',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})

frappe.ui.form.on('Production Manpower', {
	supplementary_repair : function (frm) {
		frm.call({
			method: 'set_normal_temp',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})

frappe.ui.form.on('Production Manpower', {
	supplementary_transportation : function (frm) {
		frm.call({
			method: 'set_normal_temp',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})
frappe.ui.form.on('Production Manpower', {
	supplementary_transportation : function (frm) {
		frm.call({
			method: 'set_normal_temp',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})
frappe.ui.form.on('Production Manpower', {
	supplementary_sub_total : function (frm) {
		frm.call({
			method: 'set_normal_temp',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})

frappe.ui.form.on('Production Manpower', {
	support : function (frm) {
		frm.call({
			method: 'set_normal_temp',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})

frappe.ui.form.on('Production Manpower', {
	total : function (frm) {
		frm.call({
			method: 'set_normal_temp',//function name defined in python
			doc: frm.doc, //current document
		});
	}
})

frappe.ui.form.on('Production Manpower', {
	onload : function (frm) {
		frm.call({
			method: 'set_normal_temp',//function name defined in python
			doc: frm.doc, //current document
		});
		// frm.fields_dict['direct_permanent'].$input.css('background-color', '#DAF7A6');
		 
	}
})

frappe.ui.form.on('Daily Production Report', {
    refresh: function (frm) {
        frm.fields_dict['over_time_working_hours'].$input.css('background-color', '#DAF7A6');
		frm.fields_dict['normal_working_hours'].$input.css('background-color', '#DAF7A6');
		frm.fields_dict['production_manpower'].grid.get_field('direct_permanent').$input.css('background-color', '#DAF7A6')
		cur_frm.doc.fields_dict['Field to Color'].df.input.style.color = 'blue';
		// frm.fields_dict['production_manpower'].grid.get_field('direct_permanent').$input.css('background-color', '#DAF7A6');
		
    }
});


frappe.ui.form.on('Non ST Man Hours', {
	details : function (frm) {
		frm.call({
			method: 'set_todays_man_hours',//function name defined in python
			doc: frm.doc, //current document
		});
		
	},
	non_st_man_hours_remove : function (frm) {
		frm.call({
			method: 'set_todays_man_hours',//function name defined in python
			doc: frm.doc, //current document
		});
		
	}
})

frappe.ui.form.on('Non ST Man Hours', {
	accidental_loss_details : function (frm) {
		frm.call({
			method: 'set_accidental',//function name defined in python
			doc: frm.doc, //current document
		});
		 
	}
})
frappe.ui.form.on('Non ST Man Hours', {
	accumulate_man_hours : function (frm) {
		frm.call({
			method: 'set_total',//function name defined in python
			doc: frm.doc, //current document
		}); 
	},
	non_st_man_hours_remove : function (frm) {
		frm.call({
			method: 'set_total',//function name defined in python
			doc: frm.doc, //current document
		}); 
	}

})
frappe.ui.form.on('ST Table', {
    mest: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        var result = ((child.mest * (1 - 17.2 / 85))).toFixed(2);

		child.ktmin=result
		frm.refresh_field("st_table")
    }
});
frappe.ui.form.on('ST Table', {
    mest: function(frm, cdt, cdn) {
		frm.call({
			method: 'set_total_kttime_min',//function name defined in python
			doc: frm.doc, //current document
		});
		frm.refresh_field("total_kt_timemin")
		
    },
	st_table_remove: function(frm, cdt, cdn) {
		frm.call({
			method: 'set_total_kttime_min',//function name defined in python
			doc: frm.doc, //current document
		});
		frm.refresh_field("total_kt_timemin")
		
    }
});
frappe.ui.form.on('ST Table', {
    mest: function(frm, cdt, cdn) {
		frm.clear_table("regular_production_man_hour")
		frm.call({
			method: 'fetch_kt',//function name defined in python
			doc: frm.doc, //current document
		});
		frappe.refresh_field("regular_production_man_hour")
    }
});

frappe.ui.form.on('Non Effective Time Detail', {
    non_effective_timemin: function(frm, cdt, cdn) {
		frm.call({
			method: 'set_non_effective_timemin',//function name defined in python
			doc: frm.doc, //current document
		});
		frm.refresh_field("total_non_effective_time")
		
    },
	non_effective_time_detail_remove: function(frm, cdt, cdn) {
		frm.call({
			method: 'set_non_effective_timemin',//function name defined in python
			doc: frm.doc, //current document
		});
		frm.refresh_field("total_non_effective_time")
		
    }
});

frappe.ui.form.on('Accidental Time Details', {
    accidental_timemin: function(frm, cdt, cdn) {
		frm.call({
			method: 'set_accidental_timemin',//function name defined in python
			doc: frm.doc, //current document
		});
		frm.refresh_field("total_accidental_timemin")
		
    },
	accidental_time_details_remove: function(frm, cdt, cdn) {
		frm.call({
			method: 'set_accidental_timemin',//function name defined in python
			doc: frm.doc, //current document
		});
		frm.refresh_field("total_accidental_timemin")
		
    }

});

frappe.ui.form.on('Model Change Over Time Details', {
    time_min: function(frm, cdt, cdn) {
		frm.call({
			method: 'set_model_time',//function name defined in python
			doc: frm.doc, //current document
		});
		 
		
    },
	model_change_over_time_details_remove: function(frm, cdt, cdn) {
		frm.call({
			method: 'set_model_time',//function name defined in python
			doc: frm.doc, //current document
		});
		 
		
    },
	man_hourmin: function(frm, cdt, cdn) {
		frm.call({
			method: 'set_model_man_hour',//function name defined in python
			doc: frm.doc, //current document
		});
		 
		
    },
	model_change_over_time_details_remove: function(frm, cdt, cdn) {
		
		frm.call({
			method: 'set_model_man_hour',//function name defined in python
			doc: frm.doc, //current document
		});
		 
    
    }
});

frappe.ui.form.on('Production Man Hours', {
    today: function(frm, cdt, cdn) {
		frm.call({
			method: 'set_production_sub_totals',//function name defined in python
			doc: frm.doc, //current document
		});
    }
});
frappe.ui.form.on('Production Man Hours', {
    accumulate: function(frm, cdt, cdn) {
		frm.call({
			method: 'set_accumulate',//function name defined in python
			doc: frm.doc, //current document
		});
    }
});
frappe.ui.form.on('Man Hours', {
    accumulate: function(frm, cdt, cdn) {
		frm.call({
			method: 'set_accumulate_man',//function name defined in python
			doc: frm.doc, //current document
		});
    }
});
frappe.ui.form.on('ST Loss Analysis', {
    accumulate_man_hours_st: function(frm, cdt, cdn) {
		frm.call({
			method: 'st_accumulate',//function name defined in python
			doc: frm.doc, //current document
		});
    },
	st_loss_analysis_remove: function(frm, cdt, cdn) {
		frm.call({
			method: 'st_accumulate',//function name defined in python
			doc: frm.doc, //current document
		});
    }
});
frappe.ui.form.on('Production Analysis', {
    today: function(frm, cdt, cdn) {
		frm.call({
			method: 'set_ratio',//function name defined in python
			doc: frm.doc, //current document
		});
    }
})
frappe.ui.form.on('Other Man Hour Details', {
    accumulation: function(frm, cdt, cdn) {
		frm.call({
			method: 'ac_ratio',//function name defined in python
			doc: frm.doc, //current document
		});
    }
})
