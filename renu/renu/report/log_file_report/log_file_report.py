# Copyright (c) 2023, Renu and contributors
# For license information, please see license.txt

import frappe


def execute(filters=None):
	if not filters: filters={}

	columns, data = [], []

	columns , p = create_operation_columns(filters)
	data = get_pcb_bord(filters)

	if not data:
		frappe.msgprint('🙄😵 NO RECORD FOUND 😵🙄')
		return columns, data
	return columns, data


def get_conditions(filters):
	date_filter ={}
	work_order = None
	work_order_name = None

	from_date = filters.get('from_date')
	to_date =  filters.get('to_date')
	work_order = filters.get('work_order')


	if from_date or to_date:
		date_filter = {'posting_date': ['between',[ filters.get('from_date', '2001-01-01'), filters.get('to_date', '2100-01-01')]]}

	if work_order :
		work_order_name = work_order



	return date_filter , work_order_name


def get_job_card(filters):
	operation = None
	work_order_filter = {}
	

	date_filter ,work_order_name = get_conditions(filters)
	if work_order_name:
		work_order_filter = {'work_order':work_order_name}


	final_filter = {**date_filter , **work_order_filter}	
	operation = frappe.get_all("Job Card",fields = ['operation', 'name'],filters = final_filter, distinct="operation")

	return operation

def get_pcb_bord(filters):
	result_list = []
	operation , operation_list = create_operation_columns(filters)

	time_logs_filter ={}
	if operation_list:
		time_logs_filter = {"parent": ['in',operation_list], 'pcb_qr_code': ["not in",[None , ""]]}
	time_logs = frappe.get_all("Job Card Time Log", filters = time_logs_filter, fields = ['pcb_qr_code'] , distinct="pcb_qr_code")
	for i in time_logs: 
		row_dict = {}
		all_parent = frappe.get_all("Job Card Time Log", filters = {'pcb_qr_code':i.pcb_qr_code ,'pcb_test_results':['not in',[None,'']]}, fields = ['pcb_test_results','parent','pcb_qr_code'] , distinct="pcb_qr_code")
		name_dict = {"pcb_code" :str(i.pcb_qr_code)}
		for j in all_parent:
			each_parent_dict = {str(j.parent) : str(j.pcb_test_results)}
			row_dict = {**row_dict ,**each_parent_dict}
		row_dict = {**row_dict , **name_dict}
		result_list.append(row_dict)

	return result_list
		

def create_operation_columns(filters):

	operation = get_job_card(filters)
	operation_list = []
	coloumns =[]
	name_field = {
					"fieldname": 'pcb_code',
					"fieldtype": "Data",
					"label": 'PCB QR Code',

	}
	coloumns.append(name_field)


	for o in  operation:
		each_col=	{
						"fieldname": str(o.name),
						"fieldtype": "Data",
						"label": str(o.operation),

					}
		coloumns.append(each_col)
		operation_list.append(o.name)

	return coloumns , operation_list
	