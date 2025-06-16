# Copyright (c) 2024, Renu and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import os
import shutil
import pymssql
from datetime import datetime

class ICTLogInfo(Document):
	# @frappe.whitelist()
	# def before_save(self):
	# 	self.get_log_data()
	@frappe.whitelist()
	def get_log(self):
		#custome_code
		frappe.msgprint("hello")
		source_folder="/run/user/1001/gvfs/smb-share:server=192.168.5.4,share=ict%20log%20file/REPORTS/MERLIN"
		frappe.throw(str(os.path.exists(source_folder)))
		if os.path.exists(source_folder):
			files = os.listdir(source_folder)
			server = '103.75.60.120' 
			user = 'sa'  
			password = 'Admin@123$'
			database = 'MerlinNBIoT'  # Corrected database name
			# Connect to SQL Server
			try:
				conn = pymssql.connect(server, user, password, database)
				cursor = conn.cursor()		
				for i in files:
					if(i):
						if(len(i)>32):
							file_list=i.split("_")
							qr_code=str(file_list[0])
							date_str=str(file_list[1])
							result_li=file_list[2].split(".")
							result=result_li[0]
							date=str(date_str[0:4])+"-"+str(date_str[4:6])+"-"+str(date_str[6:8])
							time=str(date_str[8:10])+":"+str(date_str[10:12])+":"+str(date_str[12:14])
							source_file_path=source_folder+"/"+str(i)
							destination_folder="/run/user/1001/gvfs/smb-share:server=192.168.5.4,share=ict%20log%20file/REPORTS/ICT Log Sync Files"
							destination_file_path = os.path.join(destination_folder, i)
							if os.path.exists(destination_folder):
								shutil.move(source_file_path, destination_file_path)
								date_time=str(date)+" "+str(time)
								check_doc=frappe.db.exists("ICT Log Info", {"qr_code":qr_code,"result":result,"date_time":date_time})
								if(not check_doc):
									doc=frappe.new_doc("ICT Log Info")
									doc.qr_code=qr_code
									doc.result=result
									doc.date_time=date_time
									doc.save()
								count=0
								testresult=0
								if(result=="PASS"):
									testresult=1
								cursor.execute("SELECT COUNT(*) FROM Merlin_ICT_Logs WHERE Barcode = %s AND TestResult = %s AND TestTime = %s", (qr_code, testresult,date_time))
								count = cursor.fetchone()[0]
								if count == 0:
									cursor.execute("INSERT INTO Merlin_ICT_Logs (Barcode,TestResult,TestResultText,TestTime) VALUES (%s,%s,%s,%s)", (qr_code,testresult,result,date_time))
									conn.commit()
			except pymssql.Error as e:
				print("Error connecting to SQL Server:", e)

			finally:
				if 'conn' in locals():
					conn.close()


@frappe.whitelist()
def get_log_data():
    source_folder = "/run/user/1000/gvfs/smb-share:server=192.168.5.4,share=ict%20log%20file/REPORTS/MERLIN"
    destination_folder = "/run/user/1000/gvfs/smb-share:server=192.168.5.4,share=ict%20log%20file/REPORTS/ICT Log Sync Files"
    # frappe.throw(str())
    # Check if source folder exists

    # frappe.throw(str(os.path.exists(source_folder)))
    if not os.path.exists(source_folder):
        frappe.msgprint(f"Source folder does not exist: {source_folder}")
        return
    files = os.listdir(source_folder)
    server = '192.168.5.4'
    user = 'PCBSERVER\\Administrator'
    password = 'P@$$w0rd#@!123'
    database = 'MerlinNBIoT'

    try:
        conn = pymssql.connect(server, user, password, database)
        cursor = conn.cursor()
        print(f"conn: {conn}")

        for filename in files:
            print(filename)
            print(os.path.exists(destination_folder))																																																						
            if filename and len(filename) > 32 and filename.endswith('.csv'): 						
                file_list = filename.split("_")																																																																																			
                qr_code = file_list[0]																																																																													
                date_str = file_list[1]  
                result = file_list[2].split(".")[0]
                print(f"result: {result}")																																																																																																																																																																												
                # Construct date and time strings
                try:
                    date = f"{date_str[:4]}-{date_str[4:6]}-{date_str[6:8]}"
                    time = f"{date_str[8:10]}:{date_str[10:12]}:{date_str[12:14]}"
                    date_time = f"{date} {time}"				

                    # Validate datetime format																										
                    datetime.strptime(date_time, '%Y-%m-%d %H:%M:%S')
                except (ValueError, IndexError) as e:																						
                    print(f"Error parsing date/time from filename {filename}: {e}")							
                    continue																																			
                
                source_file_path = os.path.join(source_folder, filename)
                destination_file_path = os.path.join(destination_folder, filename)

                print(f"Processing file: {filename}")
                print(f"Source file path: {source_file_path}")
                print(f"Destination file path: {destination_file_path}")

                # Move file
                if os.path.exists(destination_folder):
                    try:
                        shutil.move(source_file_path, destination_file_path)
                    except IOError as e:
                        print(f"Error moving file {source_file_path} to {destination_file_path}: {e}")
                        continue

                    # Check and insert into Frappe
                    check_doc = frappe.db.exists("ICT Log Info", {"qr_code": qr_code, "result": result, "date_time": date_time})
                    if not check_doc:
                        doc = frappe.new_doc("ICT Log Info")
                        doc.qr_code = qr_code
                        doc.result = result
                        doc.date_time = date_time
                        doc.insert()
                      

                    # Insert into SQL Server
                    testresult = 1 if result == "PASS" else 0
                    cursor.execute("SELECT COUNT(*) FROM Merlin_ICT_Logs WHERE Barcode = %s AND TestResult = %s AND TestTime = %s", (qr_code, testresult, date_time))
                    count = cursor.fetchone()[0]
                    # print(count)
                    if count == 0:
                        cursor.execute("INSERT INTO Merlin_ICT_Logs (Barcode, TestResult, TestResultText, TestTime) VALUES (%s, %s, %s, %s)", (qr_code, testresult, result, date_time))
                        conn.commit()

    except pymssql.Error as e:
        print(f"Error connecting to SQL Server: {e}")

    finally:
        if 'conn' in locals():
            conn.close()

# @frappe.whitelist()
# def get_log(self):
# 	source_folder="/run/user/1001/gvfs/smb-share:server=192.168.5.4,share=ict%20log%20file/REPORTS/Test"
# 	if os.path.exists(source_folder):
# 		files = os.listdir(source_folder)
# 		server = '103.75.60.120' 
# 		user = 'sa'  
# 		password = 'Admin@123$'
# 		database = 'MerlinNBIoT'  # Corrected database name

# 		# Connect to SQL Server
# 		try:
# 			conn = pymssql.connect(server, user, password, database)
# 			cursor = conn.cursor()
# 			for i in files:
# 				if(i):
# 					file_list=i.split("_")
# 					qr_code=str(file_list[0])
# 					date_str=str(file_list[1])
# 					result_li=file_list[2].split(".")
# 					result=result_li[0]
# 					date=str(date_str[0:4])+"-"+str(date_str[4:6])+"-"+str(date_str[6:8])
# 					time=str(date_str[8:10])+":"+str(date_str[10:12])+":"+str(date_str[12:14])
# 					source_file_path=source_folder+"/"+str(i)
# 					destination_folder="/run/user/1001/gvfs/smb-share:server=192.168.5.4,share=ict%20log%20file/REPORTS/ICT Log Sync Files"
# 					destination_file_path = os.path.join(destination_folder, i)
# 					if os.path.exists(destination_folder):
# 						shutil.move(source_file_path, destination_file_path)
# 						check_doc=frappe.db.exists("ICT Log Info", {"qr_code":qr_code})
# 						if(not check_doc):
# 							doc=frappe.new_doc("ICT Log Info")
# 							doc.qr_code=qr_code
# 							doc.result=result
# 							date_time=str(date)+" "+str(time)
# 							doc.date_time=date_time
# 							doc.save()
					 
# 						count=0
# 						testresult=0
# 						if(result=="PASS"):
# 							testresult=1
# 						cursor.execute("SELECT COUNT(*) FROM Merlin_ICT_Logs WHERE Barcode = %s", (qr_code))
# 						count = cursor.fetchone()[0]
# 						if count==0:
# 							cursor.execute("INSERT INTO Merlin_ICT_Logs (Barcode,TestResult,TestResultText,TestTime) VALUES (%s,%s,%s,%s)", (qr_code,testresult,result,date_time))
# 							conn.commit()
# 		except pymssql.Error as e:
# 			print("Error connecting to SQL Server:", e)

# 		finally:
# 			if 'conn' in locals():
# 				conn.close()

