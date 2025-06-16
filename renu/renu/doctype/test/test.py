# Copyright (c) 2024, Renu and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import os
import shutil

class Test(Document):
	pass


@frappe.whitelist()
def get_log():
	source_folder="/home/erpadmin/ICT LOG FILES"
	if os.path.exists(source_folder):
		files = os.listdir(source_folder)
		for i in files:
			if(i):
				file_list=i.split("_")
				qr_code=str(file_list[0])
				date_str=str(file_list[1])
				result_li=file_list[2].split(".")
				result=result_li[0]
				date=str(date_str[0:4])+"-"+str(date_str[4:6])+"-"+str(date_str[6:8])
				time=str(date_str[8:10])+":"+str(date_str[10:12])+":"+str(date_str[12:14])
				source_file_path=source_folder+"/"+str(i)
				destination_folder="/home/erpadmin/SYNC ICT LOG FILES"
				destination_file_path = os.path.join(destination_folder, i)
				if os.path.exists(destination_folder):
					shutil.move(source_file_path, destination_file_path)
					doc=frappe.new_doc("ICT Log Info")
					doc.qr_code=qr_code
					doc.result=result
					date_time=str(date)+" "+str(time)
					doc.date_time=date_time
					doc.save()