# Copyright (c) 2024, Renu and contributors
# For license information, please see license.txt

import frappe


def execute(filters=None):
	if not filters: filters={}

	columns, data = [], []

	columns = get_columns(filters)
	data = get_data(filters)

	if not data:
		frappe.msgprint('🙄😵 NO RECORD FOUND 😵🙄')
		return columns, data
	return columns, data

def get_columns(filters):
	coloumns = [{
					"fieldname": 'pcb_code',
					"fieldtype": "Data",
					"label": 'PCB QR Code',
				},
	 			{
					"fieldname": 'honeywell_qr',
					"fieldtype": "Data",
					"label": 'Honeywell QR',
				}]
	work_order = filters.get('work_order')
	operation = frappe.get_all("Work Order Operation",fields = ['operation',],filters = {'parent':work_order}, distinct="operation")
	for o in  operation:
		each_col=	{
						"fieldname": str(o.operation),
						"fieldtype": "Data",
						"label": str(o.operation),

					}
		coloumns.append(each_col)
	return coloumns

def get_data(filters):
	data = []
	work_order = filters.get('work_order')
	from_date = filters.get('from_date')
	to_date = filters.get('to_date')
	pcb_details = frappe.get_all("PCB Details" , filters = {'parent': work_order} , fields = ['qr_code'] , distinct="qr_code")
	for i in pcb_details:
		honeywell_qr=frappe.get_value("Job Card Time Log",{'pcb_qr_code':i.qr_code , 'parent':"PO-JOB00266"},'honeywell_qr')
		operation_data = 	frappe.db.sql("""
											SELECT a.operation, b.product_type
											FROM `tabJob Card` a
											LEFT JOIN `tabJob Card Time Log` b ON a.name = b.parent
											WHERE a.posting_date BETWEEN %s AND %s AND a.work_order = %s AND b.pcb_qr_code = %s
										""",(from_date , to_date , work_order , i.qr_code),as_dict="True")
		row_dict = {"pcb_code" :str(i.qr_code),"honeywell_qr": str(honeywell_qr)}
		for j in operation_data:
			each_parent_dict = {str(j.operation) : str(j.product_type)}
			row_dict = {**row_dict ,**each_parent_dict}
		data.append(row_dict)

	# frappe.msgprint(str(operation_data))
	return data



	# 	operation = frappe.get_all("Work Order Operation",fields = ['operation',],filters = {'parent':work_order}, distinct="operation")
	# pcb_details = frappe.get_all("PCB Details" , filters = {'parent': work_order} , fields = ['qr_code'] , distinct="qr_code")