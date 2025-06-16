// Copyright (c) 2023, Renu and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Board Data For Sleep"] = {
	"filters": [
		{
			"fieldname": "work_order",
			"fieldtype": "Link",
			"label": "Select Work Order",
			"options": "Work Order",
			'reqd':1,

		},
		{
			"fieldname": "from_date",
			"fieldtype": "Date",
			"label": " From Date",
			'reqd':1,
			'default': frappe.datetime.add_months(frappe.datetime.get_today(), -1)


		},
		{
			"fieldname": "to_date",
			"fieldtype": "Date",
			"label": " To Date",
			'reqd':1,
			'default':frappe.datetime.get_today(),

		},
	]
};
// Copyright (c) 2024, Renu and contributors
// For license information, please see license.txt
/* eslint-disable */

// frappe.query_reports["Development Script Report"] = {
// 	"filters": [
// 		{
// 			"fieldname": "work_order",
// 			"fieldtype": "Link",
// 			"label": "Select Work Order",
// 			"options": "Work Order",
// 			'reqd':1,

// 		},
// 		{
// 			"fieldname": "from_date",
// 			"fieldtype": "Date",
// 			"label": " From Date",
// 			'reqd':1,
// 			'default': frappe.datetime.add_months(frappe.datetime.get_today(), -1)


// 		},
// 		{
// 			"fieldname": "to_date",
// 			"fieldtype": "Date",
// 			"label": " To Date",
// 			'reqd':1,
// 			'default':frappe.datetime.get_today(),

// 		},
// 	]
// };
